import { API_ANALYSIS_TEMPERATURE_URL } from '@/constants';
import { API_Inits, getDeformatAnalysisData, requestToAPI } from '@/handlers';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
export default () => {
  const { socket } = useModel('deviceInfo');
  const { currentSelectDevice } = useModel('currentSelectDevice');
  const [deviceInfoAnalysis, setDeviceInfoAnalysis] = useState({});

  const updateDeviceinfoAnalysis = (deformatMessage) => {
    setDeviceInfoAnalysis((prevDeviceInfoAnalysis) => ({
      ...prevDeviceInfoAnalysis,
      ...deformatMessage,
    }));
  };
  useEffect(async () => {
    const firstFormatAnalysis = await requestToAPI(
      `${API_ANALYSIS_TEMPERATURE_URL}?devID=${currentSelectDevice}`,
      API_Inits({ method: 'GET' }),
    );
    const firstDeformatAnalysis = getDeformatAnalysisData(firstFormatAnalysis);
    setDeviceInfoAnalysis(firstDeformatAnalysis);

    socket.on('formatDeviceInfoAnalysis', (formatDeviceInfoAnalysisMessage) => {
      const deformatDeviceInfoAnalysisMessage = getDeformatAnalysisData(
        formatDeviceInfoAnalysisMessage,
      );
      updateDeviceinfoAnalysis(deformatDeviceInfoAnalysisMessage);
    });
  }, []);

  const currentSelectDeviceAnalysis = deviceInfoAnalysis
    ? deviceInfoAnalysis[currentSelectDevice]
    : [];

  return { currentSelectDeviceAnalysis };
};
