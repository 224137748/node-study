
  import { shallowMount } from '@vue/test-utils'
  import Home from '../Home.vue'

describe('Home', () => {
  it('Home.vue 单元测试', () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          message: 'Hello World',
          username: ''
        }
      }
    })

    // 确认是否渲染了 'message'
    expect(wrapper.find('.message').text()).toEqual('Hello World')

    // 断言渲染了错误信息
    expect(wrapper.find('.error').exists()).toBeTruthy()

    // 更新 'username' 并断言错误信息不再被渲染
    wrapper.setData({ username: 'Lachlan' })
    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})
  