import { API_GET_FILE_LIST_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const { socket } = useModel('deviceInfo');
  const tableActionRef = useRef();
  const [fileListOBJ, setFileListOBJ] = useState({
    data: [],

    page: 1,
    success: true,
    total: 5,
  });
  // const [filterFileListOBJ, setFilterFileListOBJ] = useState([]);
  useEffect(async () => {
    const fileListOBJAPI = await requestToAPI(API_GET_FILE_LIST_URL, API_Inits({ method: 'GET' }));
    setFileListOBJ(fileListOBJAPI);

    socket.on('reload_file_list', async () => {
      const fileListOBJAPI = await requestToAPI(
        API_GET_FILE_LIST_URL,
        API_Inits({ method: 'GET' }),
      );
      setFileListOBJ(fileListOBJAPI);

      // reload table
      tableActionRef.current?.reload();
    });
  }, []);

  const handleProTableRequest = async (params = {}, sort, filter) => {
    const { version, startTime, endTime } = params;

    let filterFileList_local = [...fileListOBJ.data];

    if (version) {
      filterFileList_local = await filterFileList_local.filter(
        (filleOBJ) => filleOBJ.version == version,
      );
    }

    if (startTime && endTime) {
      // console.log(filterFileList_local.map((file) => new Date(file.ctimeMs).toISOString()));
      filterFileList_local = await filterFileList_local.filter((fileOBJ) => {
        const { ctimeMs } = fileOBJ;
        const startTimeMs = new Date(startTime).getTime();
        const endTimeMs = new Date(endTime).getTime();

        return ctimeMs >= startTimeMs && ctimeMs <= endTimeMs;
      });
    }

    return { ...fileListOBJ, data: [...filterFileList_local] };
  };
  return { fileListOBJ, handleProTableRequest, tableActionRef };
};
