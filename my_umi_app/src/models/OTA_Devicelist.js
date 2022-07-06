import { API_GET_DEVICE_LIST_URL } from "@/constants";
import { API_Inits, requestToAPI } from "@/handlers";
import { useEffect, useRef, useState } from "react";
import { useModel } from 'umi';

export default () => {
    const tableActionRef = useRef();
    const { socket } = useModel('deviceInfo');
    const [devicelistOBJ, setDevicelistOBJ] = useState({
        data: [{
            devID: '1',
            //   labels: [{ name: 'Updated', color: 'success' }],
            version: '1.0',
            created_at: '2020-05-26T09:42:56Z',
            ota_upload_time: '2020-05-26T10:03:02Z',
            devicetype: 'ESP32'
            ,filetype: 'Local'
          },],
    
        page: 1,
        success: true,
        total: 5,
      });
      useEffect(async () => {
        const deviceListOBJAPI = await requestToAPI(API_GET_DEVICE_LIST_URL, API_Inits({ method: 'GET' }));
        // console.log(deviceListOBJAPI)
        setDevicelistOBJ(deviceListOBJAPI);
    
        socket.on('reload_device_list', async () => {
          const deviceListOBJAPI = await requestToAPI(
            API_GET_DEVICE_LIST_URL,
            API_Inits({ method: 'GET' }),
          );
          setDevicelistOBJ(deviceListOBJAPI);
    
          // reload table
          tableActionRef.current?.reload();
        });
      }, []);
      const handleProTableRequest = async (params = {}, sort, filter) => {
        const { version, startTime, endTime } = params;
    
        let filterDeviceList_local = [...devicelistOBJ.data];
    
        if (version) {
          filterDeviceList_local = await filterDeviceList_local.filter(
            (filleOBJ) => filleOBJ.version == version,
          );
        }
    
        if (startTime && endTime) {
          // console.log(filterFileList_local.map((file) => new Date(file.ctimeMs).toISOString()));
          filterDeviceList_local = await filterDeviceList_local.filter((fileOBJ) => {
            const { ctimeMs } = fileOBJ;
            const startTimeMs = new Date(startTime).getTime();
            const endTimeMs = new Date(endTime).getTime();
    
            return ctimeMs >= startTimeMs && ctimeMs <= endTimeMs;
          });
        }
    
        return { ...devicelistOBJ, data: [...filterDeviceList_local] };
      };
    return {devicelistOBJ, handleProTableRequest,tableActionRef }
}