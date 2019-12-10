<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style  lang='scss'>
*{
  box-sizing: border-box;
}
.cell-field{
  display: flex;
  width:100%;
  height: 48px;
  line-height: 1;
  padding: 0 10px;
  font-size: 16px;
  align-items: center;
  border-top:1px solid #d9d9d9;
  .cell-title{
      width:105px;
  }
  .cell-value{
      display: flex;
      flex: 1;
      align-items: center;
      input[type=text]{
          appearance: none;
          border-radius: 0;
          border: 0;
          box-flex: 1;
          flex: 1;
          outline: 0;
          line-height: 1.6;
          font-size: inherit;
          width: 100%;
      }
      .cell-checkbox-label,.cell-radio-label{
       width:80px;
      
      }
  }
  &:last-child{
      border-bottom:1px solid #d9d9d9;
  }
}
</style>