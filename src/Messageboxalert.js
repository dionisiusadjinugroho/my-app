
import { message, } from 'antd';
import "antd/dist/antd.css";

const Messageboxalert = (text, option) => {
    if (option === 'success') {
      message.success({
        content: text,
        // style: {
        //   marginTop: '20vh',
        // },
      });
    }
    if (option === 'warning') {
      message.warning({
        content: text,
        style: {
          marginTop: '20vh',
        },
      });
    }
    if (option === 'error') {
      message.error({
        content: text,
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  export { Messageboxalert }