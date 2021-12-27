const swiperConfig = {
    direction: 'vertical',
    slidesPerView: 1,
    allowTouchMove: false
}



class Form {
    steps = []
    current = 0;

    constructor() {
        this.swiper = new Swiper('.swiper', swiperConfig);

        document.onclick = function(event) {
            const el = event.target;
            if (el.className === 'next-button'){
              this.setStep(this.current + 1);
            }
        }.bind(this);
    }

    setStep(step){
        this.current = step;
        if (this.current > 0 && this.current !== this.steps.length){
            this.generate(this.steps[this.current])
            this.swiper.slideNext();
        }else{
            const swiperContainer = document.querySelector('.swiper');
            const finishTemplate = document.querySelector('.finish-template')
            console.log(finishTemplate)
            swiperContainer.innerHTML = '';
            swiperContainer.innerHTML = finishTemplate.innerHTML;
        }
    }

    start(){
        this.generate(this.steps[this.current]);
    }

    input(step){
        return `<input 
                    type="${step.type}" 
                    ${step.required && 'required'} 
                    placeholder="${step.placeholder}" 
                />`;
    }

    select(step){

        let res = `<select name="${name}" ${step.required && 'required'}>
                    <option value="">Seçiniz</option>`

        step.values.forEach((value) => {
            res += `<option value="${value.option}">${value.option}</option>`
        })

        res += `</select>`;

        return res;
    }

     generate(step){
        if (!step.hasOwnProperty('type')){
            step.type = 'input';
        }
        if (!step.hasOwnProperty('placeholder')){
            step.placeholder = 'Cevabını buraya yaz...'
        }
        let field = this[step.type](step);
        let template = document.getElementById('slide-template').innerHTML;
        template = template
                    .replace('{field}', field)
                    .replace('{title}', step.title);

        this.swiper.appendSlide(template);
    }

    step(step){
        this.steps.push(step)
        return this;
    }

}

const form = new Form();

form.step({
    name: 'name',
    title: 'Adınızı giriniz',
    required: true
}).step({
    name: 'surname',
    title: 'Soyadınızı giriniz',
    required: true
}).step({
    name: 'gender',
    title: 'Cinsiyetinizi giriniz',
    type: 'select',
    values: [
        {
            option: 'Kadın',
        },
        {
            option: 'Erkek'
        }
    ],
    required: true
})

form.start();
