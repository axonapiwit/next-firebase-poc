import type { ThemeConfig } from 'antd';

import { theme } from 'antd';

const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme;

const themeToken: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#2f54eb',
    colorBgContainer: '#f2f2f2',
    borderRadiusLG: 4,
    colorSuccess: '#f2bd27',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
  },
  algorithm: [darkAlgorithm],
  components: {
    Button: {
      colorBgContainer: '#141414',
    },
    Menu: {
      algorithm: darkAlgorithm,
    },
    Layout: {
      headerBg: '#141414',
      siderBg: '#141414',
      triggerBg: '#444',
      triggerColor: '#fff',
      algorithm: true,
    },
    DatePicker: {
      colorBgContainer: '#141414',
    },
    Input: {
      algorithm: true,
      colorBgContainer: '#141414',
    },
  }
};

export default themeToken;