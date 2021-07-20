#!usr/bin/env node
const inquirer = require('inquirer');
inquirer
  .prompt([
    // {
    //     type: 'input',
    //     message: '设置一个用户名:',
    //     name: 'name',
    //     default: "test_user" // 默认值
    // },
    // {
    //     type: 'input',
    //     message: '设置一个密码:',
    //     name: 'psw',
    //     default: "123" // 默认值
    // },
    // {
    //     // type: 'confirm',
    //     name: 'question1',
    //     message: 'Did you like enquirer?'
    // },
    // {
    //     type: 'confirm',
    //     name: 'question2',
    //     prefix: "前缀",
    //     message: 'Did you like enquirer?',
    //     when: function(answers) { // 当question1有值的时候才会提问当前问题
    //         return answers.question1
    //     }
    // },

    // {
    //     type: 'list',
    //     message: '请选择一种水果:',
    //     name: 'fruit1',
    //     choices: [
    //         "Apple",
    //         "Pear",
    //         "Banana"
    //     ],
    //     filter: function (val) { // 使用filter将回答变为小写
    //         return val.toLowerCase();
    //     }
    // },
    // {
    //     type: 'rawlist',
    //     message: '请选择一种水果:',
    //     name: 'fruit2',
    //     choices: [
    //         "Apple",
    //         "Pear",
    //         "Banana"
    //     ]
    // },
    // {
    //     type: "expand",
    //     message: "请选择一种水果：",
    //     name: "fruit3",
    //     choices: [
    //         {
    //             key: "a",
    //             name: "Apple",
    //             value: "apple"
    //         },
    //         {
    //             key: "O",
    //             name: "Orange",
    //             value: "orange"
    //         },
    //         {
    //             key: "p",
    //             name: "Pear",
    //             value: "pear"
    //         }
    //     ]
    // },

    // {
    //     type: "checkbox",
    //     message: "选择颜色:",
    //     name: "color",
    //     choices: [
    //         {
    //             name: "red"
    //         },
    //         new inquirer.Separator(), // 添加分隔符
    //         {
    //             name: "blur",
    //             checked: true // 默认选中
    //         },
    //         {
    //             name: "green"
    //         },
    //         new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
    //         {
    //             name: "yellow"
    //         }
    //     ]
    // },

    {
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "pwd"
    },
    {
        type: "editor",
        message: "请输入备注：",
        name: "editor"
    }
  ])
  .then((answers) => { // Use user feedback for... whatever!!
    console.log('用户操作结果', answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log('错误1', error)
      // Prompt couldn't be rendered in the current environment
    } else {
        console.log('错误2', error)
      // Something else went wrong
    }
  });