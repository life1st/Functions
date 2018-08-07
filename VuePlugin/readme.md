# Vue Plugins

Some Plugin I created 

`screenshot：`

![screenshot](./document/image/2018-6-27_20-51-25.jpg)

## simple Vue toast

It's a toast or message component for who use vue to create project.

nothing else, just simple.

### usage

// todo
copy file in th

### message

path: `./src/components/plugin/message`

#### usage:

在Vue根组件中： 

`import { msgPlugin } from './components/plugin'`

`Vue.use(msgPlugin)`

现在 message 组件已经挂载到 Vue 实例上，在需要message的地方使用：

`this.$msg({config})`

弹框默认关闭时间是2500ms。如果需要手动关闭message框，使用

`this.msg = this.$msg({config})`

返回值是 message 实例，可以在需要的地方通过调用
`this.msg.close()` 关闭message框。

```javascript
config = {
  text: 'foo', // 显示的文字
  type: '', // ['default', 'success', 'info', 'warning', 'error'] 弹框类型，会改变文字前图标样式。现只支持 'default'(默认类型，不需要指定)、'warning' (红色感叹号图标)
  close: true  // 是否自动关闭
}
```

### loading

全屏 loading 组件。可在 ajax，大量计算等耗时操作时使用。

#### usage

在Vue根组件中： 

`import { loadingPlugin } from './components/plugin'`

`Vue.use(loadingPlugin)`

在需要使用的地方：

`this.loading = this.$loading('String')`

返回值是 loading 实例。调用：`this.loading.close()` 手动关闭。

