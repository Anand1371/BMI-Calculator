import { LightningElement, api } from 'lwc';

export default class BmiCalculatorResult extends LightningElement {
    @api result;

    bmiReCalculate()
    {
        //Create and Dispatch the Event
        this.dispatchEvent(new CustomEvent('showhome', {
            detail : 'true'
        }));
    }
}