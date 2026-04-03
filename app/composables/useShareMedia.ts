import config from '~/config/index';

export default class useShareMedia{

    #description;
    #slugShared;

    constructor(slug: string, desc: string){
        this.#slugShared = config.baseURL+'/'+slug;
        this.#description = desc;
    }
   
    x(){
        return `https://twitter.com/intent/tweet?url=${this.#slugShared}&[text=${this.#description}]`
    };
    facebook(){
        return `https://www.facebook.com/sharer/sharer.php?u=${this.#slugShared}`
    };
    linkedin(){
        return `https://www.linkedin.com/shareArticle?mini=true&url=${this.#slugShared}`
    };
    whatsapp(){
        return `https://api.whatsapp.com/send?text=${this.#slugShared}`
    };
    telegram(){
        return `https://t.me/share/url?url={${this.#slugShared}&text={${this.#description}}`
    };
    pocket(){
        return `https://getpocket.com/save?url=${this.#slugShared}`
    }
}