const fs = require("fs");
const { parse, basename, extname, dirname, format, resolve } = require("path");

function getTestFileName(filePath) {
  const baseName = basename(filePath);
  const extnName = extname(filePath);
  const dirName = dirname(filePath);
  const testName = baseName.replace(extnName, `.spec.js`);

  return format({
    root: dirName + "/",
    base: testName,
  });
}

function getTestSource(filename, desc) {
  const { name, base } = parse(filename);

  return `
  import { shallowMount } from '@vue/test-utils'
  import ${name} from './${base}'

describe('${name}', () => {
  it('${desc || "renders a " + name + "component"}', () => {
    const wrapper = shallowMount(${name}, {
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
  `;
}

module.exports = () => {
  const list = fs.readdirSync("./src/views");
  list.forEach((file) => {
    const writePath = getTestFileName("./src/views/" + file);

    const testContent = getTestSource(file, `${file} 单元测试`);
    fs.writeFileSync(resolve(writePath), testContent);
  });
};
