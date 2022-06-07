const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
  if (!val) {
    return '请输入账号';
  }
  const resp = await API.exists(val);
  if (resp.data) {
    //账号已存在
    return '该账号已被占用，请重新选择一个账号名';
  }
});

const nicknameValidator = new FieldValidator('txtNickname', function (val) {
  if (!val) {
    return '请填写昵称';
  }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
  if (!val) {
    return '请填写密码';
  }
});

const loginPwdConfirmValidator = new FieldValidator(
  'txtLoginPwdConfirm',
  function (val) {
    if (!val) {
      return '请填写确认密码';
    }
    if (val !== loginPwdValidator.input.value) {
      return '两次密码不一致';
    }
  }
);

const form = $('.user-form');

form.onsubmit = async function (e) {
  e.preventDefault(); //阻止事件的默认行为,form默认行为是刷新页面
  const result = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator
  );
  if (!result) {
    return; //验证未通过
  }

  const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
  const data = Object.fromEntries(formData.entries());
  //Object.entries()返回一个数组，其元素是与直接在object上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
  //Object.fromEntries() 方法把键值对列表转换为一个对象。

  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert('注册成功，点击确定，跳转到登录页');
    location.href = './login.html';
  }
};
