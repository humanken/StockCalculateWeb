declare const ElMessage: typeof import('element-plus')['ElMessage']


export const useMessage = () => {

    const show = (
        type: 'error'|'warning'|'success'|'info',
        msg: string,
        duration = 6000,
        showClose = true
    ) => {
      return ElMessage({
          showClose: showClose,
          message: msg,
          type: type,
          duration: duration
      });
    }

    return { show }
}