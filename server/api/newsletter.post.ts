import { createError, defineEventHandler, readBody, getRequestHeader } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  const cloudflare = event.context.cloudflare

  if (!body?.email || !body?.name) {
    throw createError({ statusCode: 400, statusMessage: 'Nome e e-mail são obrigatórios.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail inválido.' })
  }

  const origin = getRequestHeader(event, 'origin')
  if (process.env.NODE_ENV === 'production' && origin && !origin.includes('orarelabutar.com')) {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado.' })
  }

  const db = cloudflare?.env?.DB
  if (!db && process.env.NODE_ENV !== 'development') {
    throw createError({ statusCode: 500, statusMessage: 'Banco de dados não configurado.' })
  }

  try {
    if (db) {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run()

      await db.prepare('INSERT INTO newsletter_subscribers (name, email) VALUES (?, ?)')
        .bind(body.name, body.email)
        .run()
    }

    // Implementação correta de acordo com EMAIL_SERVICE.md
    const emailService = cloudflare?.env?.SEND_EMAIL
    if (emailService) {
      const senderEmail = cloudflare?.env?.NEWSLETTER_FROM || 'contato@orarelabutar.com'
      const adminEmail = cloudflare?.env?.NEWSLETTER_TO || 'helenosalgado19@gmail.com'

      await emailService.send({
        to: adminEmail,
        from: { email: senderEmail, name: 'Orar e Labutar' },
        subject: `Novo inscrito: ${body.name}`,
        text: `O usuário ${body.name} (${body.email}) acaba de se inscrever na newsletter.`,
        html: `
          <div style="font-family: serif; padding: 20px; border: 1px solid #b8860b;">
            <h2 style="color: #b8860b;">Novo Inscrito na Newsletter</h2>
            <p><strong>Nome:</strong> ${body.name}</p>
            <p><strong>E-mail:</strong> ${body.email}</p>
          </div>
        `
      })
    }

    return { success: true, message: 'Inscrito com sucesso!' }
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return { success: true, message: 'Este e-mail já está cadastrado.' }
    }
    throw createError({ statusCode: 500, statusMessage: 'Erro interno ao processar inscrição.' })
  }
})
