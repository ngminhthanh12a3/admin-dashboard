import { API_OTA_FIELDS_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export default () => {
  //   console.log(await requestToAPI(API_OTA_CURRENT_VERSION_URL, API_Inits({ method: 'GET' })));
  const { socket } = useModel('deviceInfo');
  const [OTA_FIELDS, setOTA_FIELDS] = useState([]);

  useEffect(async () => {
    const OTA_FIELDS = await requestToAPI(API_OTA_FIELDS_URL, API_Inits({ method: 'GET' }));

    setOTA_FIELDS([...OTA_FIELDS]);
    socket.on('OTA_Update', (OTA_FIELDS) => {
      setOTA_FIELDS([...OTA_FIELDS]);
    });
  }, []);

  const OTA_GET_FIELD = ({
    OTA_FILETYPE: queryOTA_FILETYPE,
    OTA_DEVICE_TYPE: queryOTA_DEVICE_TYPE,
  }) => {
    // const { OTA_FILETYPE: queryOTA_FILETYPE, OTA_DEVICE_TYPE: queryOTA_DEVICE_TYPE } = query;

    const queryOBJ =
      OTA_FIELDS.find(({ OTA_FILETYPE, OTA_DEVICE_TYPE }) => {
        return OTA_FILETYPE === queryOTA_FILETYPE && OTA_DEVICE_TYPE === queryOTA_DEVICE_TYPE;
      }) || {};

    // const returnOBJ = { ...queryOBJ };

    // return { ...returnOBJ };
    return queryOBJ;
  };
  return { OTA_FIELDS, OTA_GET_FIELD };
};
