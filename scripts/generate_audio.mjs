#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { loadEnvFile, argv } from 'node:process';
import { execSync } from 'node:child_process';

/**
 * Script to generate audio for blog posts using xAI TTS API.
 * Automatically detects posts without audio and generates them.
 * 
 * Usage:
 *   node scripts/generate_audio.mjs               # Process all new posts
 *   node scripts/generate_audio.mjs slug-do-post  # Process specific post
 *   node scripts/generate_audio.mjs --force       # Regenerate all audios
 *   node scripts/generate_audio.mjs --dry-run     # Preview text without calling API
 *   node scripts/generate_audio.mjs --char-count  # Show character count
 */

// Load .env
try { loadEnvFile(); } catch (e) {
  // .env file might not exist
}

const XAI_API_KEY = process.env.XAI_API_KEY;
const API_URL = "https://api.x.ai/v1/tts";

const POSTS_DIR = 'data/narrar';
const AUDIO_PUBLIC_DIR = 'public/audio';
const AUDIO_CONTENT_DIR = 'content/audios';

if (!XAI_API_KEY) {
  console.error('Error: XAI_API_KEY not found in .env file.');
  process.exit(1);
}

// Ensure directories exist
[AUDIO_PUBLIC_DIR, AUDIO_CONTENT_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

/**
 * Gets audio duration using ffprobe
 */
function getDuration(filePath) {
  try {
    const output = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`, { encoding: 'utf-8' });
    const seconds = parseFloat(output);
    if (isNaN(seconds)) return "0:00";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } catch (e) {
    console.error(`Error getting duration for ${filePath}:`, e.message);
    return "0:00";
  }
}

/**
 * Simple frontmatter and body extractor
 */
function parseMarkdown(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const yaml = match[1];
  const body = content.slice(match[0].length).trim();
  const frontmatter = {};

  yaml.split('\n').forEach(line => {
    const index = line.indexOf(':');
    if (index > -1) {
      const key = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();
      // Remove surrounding quotes if any
      value = value.replace(/^['"](.*)['"]$/, '$1');
      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * Calls xAI TTS API
 */
async function generateAudioFile(text, outputPath) {
  console.log(`Calling xAI TTS API (with normalization)...`);

  const payload = {
    text: text,
    voice_id: "abfbdf26f115", // Pedro -> a0fa45a6 Mateus -> abfbdf26f115 Rafael -> 3d030bc92a87
    output_format: {
      codec: "mp3",
      sample_rate: 44100,
      bit_rate: 128000
    },
    language: "pt-BR"
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const buffer = await response.arrayBuffer();
  writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`✓ Saved ${buffer.byteLength.toLocaleString()} bytes to ${outputPath}`);
}

/**
 * Processes a single post
 */
async function processPost(slug, force = false, dryRun = false, charCount = false) {
  const postPath = join(POSTS_DIR, `${slug}.md`);
  const audioPublicPath = join(AUDIO_PUBLIC_DIR, `${slug}.mp3`);
  const audioContentPath = join(AUDIO_CONTENT_DIR, `${slug}.md`);

  if (!existsSync(postPath)) {
    console.error(`Post not found: ${postPath}`);
    return;
  }

  if (existsSync(audioPublicPath) && !force && !dryRun) {
    console.log(`- Skipping ${slug} (Audio already exists)`);
    return;
  }

  console.log(`Processing: ${slug}${force ? ' (FORCE)' : ''}${dryRun ? ' (DRY RUN)' : ''}`);
  
  const content = readFileSync(postPath, 'utf-8');
  const { frontmatter, body } = parseMarkdown(content);
  
  const title = frontmatter.title || slug;
  const description = frontmatter.description || '';
  
  const textToRead = `${title}\n${body}`;

  if (charCount || dryRun) {
    console.log(`Character count: ${textToRead.length}`);
  }

  if (dryRun) {
    console.log('\n--- PREVIEW START ---');
    console.log(textToRead);
    console.log('--- PREVIEW END ---\n');
    return;
  }

  try {
    await generateAudioFile(textToRead, audioPublicPath);
    const duration = getDuration(audioPublicPath);
    
    // Create audio metadata file
    const audioMetadata = `---
title: "${title}"
description: "${description}"
imgUrl: "/img/${slug}.webp"
duration: "${duration}"
createdAt: "${new Date().toISOString().split('T')[0]}"
---
`;
    writeFileSync(audioContentPath, audioMetadata);
    console.log(`✓ Metadata created at ${audioContentPath}`);
  } catch (error) {
    console.error(`✗ Failed to process ${slug}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  const args = argv.slice(2);
  const force = args.includes('--force');
  const dryRun = args.includes('--dry-run');
  const charCount = args.includes('--char-count');
  const specificSlug = args.find(arg => !arg.startsWith('--'));

  if (specificSlug) {
    // Extract slug if a path or filename was provided
    let slug = basename(specificSlug, '.md');
    // If it still contains directory parts (unlikely with basename but for safety)
    slug = basename(slug); 
    await processPost(slug, force, dryRun, charCount);
  } else {
    const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} posts. Checking for missing audios...`);
    
    for (const file of files) {
      const slug = basename(file, '.md');
      await processPost(slug, force, dryRun, charCount);
    }
  }
  
  console.log('Audio generation process finished.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
