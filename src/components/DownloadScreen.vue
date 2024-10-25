<template>
    <div class="download">
      <h1>Download</h1>
      <form ref="codeFile" @submit.prevent="downloadFile">
       <input  type="text" @change="onTextChange" name="text">
        <button type="submit">Download</button>
      </form>
    </div>
  </template>
  
  <script>
  import server from '../server/api'
  export default {
    data(){
        return {
            selectedFileCode: null
        }
    },
    methods:{
        onTextChange(event){
            this.selectedFileCode = event.target.value;
        },
        async downloadFile(){
            if(!this.selectedFileCode){
              alert("Please select a file code to download.")  ;
              return;
            }

            const requestUrlToDownload = process.env.VUE_APP_REQUEST_URL_TO_DOWNLOAD_FILE;
            try{

                const request = await server.get(`${requestUrlToDownload}${this.selectedFileCode}`);
                const { url } = await request.data;
                
                const download = await fetch(url, { method: "GET" });
                const blob = await download.blob();
                const file = window.URL.createObjectURL(blob);
          
                const a = document.createElement('a');
                a.href = file;
                a.download = `${this.selectedFileCode}.${blob.type.split("/")[1]}`; // Specify the name for the downloaded file
                document.body.appendChild(a); // Append to the DOM
                a.click(); // Trigger the click event
                a.remove(); // Remove the anchor element
                
                // Revoke the object URL after the download
                window.URL.revokeObjectURL(url);
            }catch(err){
                alert("File doesn't exists")
                console.log(err)
            }
        }

    },
    name: 'DownloadScreen',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  