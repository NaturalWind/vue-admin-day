import DayForm from '@/components/DayForm';
import DayIconSelect from '@/components/DayIconSelect';
import DayBaseContainer from '@/components/DayBaseContainer';
import DayTable from '@/components/DayTable';

export default {
  install: (Vue, options) => {
    console.log(options);
    Vue.component('DayForm', DayForm);
    Vue.component('DayIconSelect', DayIconSelect);
    Vue.component('DayBaseContainer', DayBaseContainer);
    Vue.component('DayTable', DayTable);
  }
}
