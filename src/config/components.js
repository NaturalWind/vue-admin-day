import DayForm from '@/components/DayForm';
import DayIconSelect from '@/components/DayIconSelect';

export default {
  install: (Vue, options) => {
    console.log(options);
    Vue.component('DayForm', DayForm);
    Vue.component('DayIconSelect', DayIconSelect);
  }
}
