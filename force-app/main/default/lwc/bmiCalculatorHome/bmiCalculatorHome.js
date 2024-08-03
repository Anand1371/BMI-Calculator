import { LightningElement } from 'lwc';
import genderIcons from '@salesforce/resourceUrl/genderIcons';

export default class BmiCalculatorHome extends LightningElement {

    maleIcon = genderIcons + '/genderIcons/male.png';
    femaleIcon = genderIcons + '/genderIcons/female.png';

    result = {};
    selectedGender;
    height = 0;
    weight = 0;

    showHome = true;
    showResult = false;

    handleGenerClick(event)
    {
        this.selectedGender = event.currentTarget.dataset.value;

        // Remove 'gender-selected, bmi-sub-titles-color' class from Gender Card and Text
        this.refs.male.classList.remove('gender-selected');
        this.refs.female.classList.remove('gender-selected');
        this.refs.maleText.classList.remove('bmi-sub-values-color');
        this.refs.femaleText.classList.remove('bmi-sub-values-color');

        // Add 'gender-selected, bmi-sub-titles-color' class to the chosen card
        if(this.selectedGender == 'male'){
            this.refs.male.classList.add('gender-selected');
            this.refs.maleText.classList.add('bmi-sub-values-color');
        } else{
            this.refs.female.classList.add('gender-selected');
            this.refs.femaleText.classList.add('bmi-sub-values-color');
        }
    }

    heightChangeHandler(event)
    {
        this.height = event.currentTarget.value;
        console.log('height', this.height);
    }

    weightChangeHandler(event)
    {
        this.weight = event.currentTarget.value;
        console.log('weight', this.weight);
    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity() || inputField.value == 0) {
                inputField.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }

    bmiCalculate()
    {
        if(this.isInputValid())
        {
            let heightInMeters = (this.height * this.height)/10000;
            this.result.bmiValue = (this.weight/heightInMeters).toFixed(1);
            this.result.bmiStatus = this.calculateStatus(this.result.bmiValue);

            this.showResult = true;
            this.showHome = false;
        }
    }

    calculateStatus(bmiValue)
    {
        if(bmiValue < 16){
            return 'SEVERE THICKNESS';
        } else if(bmiValue < 18.5){
            return 'UNDERWEIGHT';
        } else if(bmiValue < 25){
            return 'NORMAL';
        } else if(bmiValue < 30){
            return 'OVERWEIGHT';
        } else{
            return 'OBESITY';
        }
    }

    recalculateBmi(event)
    {
        this.showHome = event.detail;
    }
}