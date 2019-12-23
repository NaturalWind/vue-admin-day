<script>
export default {
  name: 'RenderItem',
  functional: true,
  props: {
    render: Function,
    data: Object
  },
  render: (h, context) => {
    const props = context.props;
    console.log('----', props.render(h, props.data))
    return props.render(h, props.data);
  }
}
</script>
