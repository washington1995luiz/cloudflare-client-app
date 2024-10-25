<template>
    <div class="upload">
      <h1>{{ upload }}</h1>
      <form ref="file" @submit.prevent="uploadFile" enctype="multipart/form-data">
       <input  type="file" @change="onFileChange" name="file">
        <button type="submit">Upload</button>
      </form>
      <div>
        <h3>{{ success }}<br />{{ successExpires }}</h3>
        <h3 id="successCode">{{ successCode }}</h3>
      </div>
    </div>
  </template>
  
  <script>

  import server from '../server/api'
  import axios from 'axios';
  
  export default {
    data() {
        return {
            selectedFile: null,
            upload: 'Upload',
            success: '',
            successCode: '',
            successExpires: ''
        }
    },
    methods:{
        onFileChange(event){
            this.selectedFile = event.target.files[0];
        },
        async uploadFile(){
            if(!this.selectedFile){
                alert("Please select a file to upload.");
                return;
            }

           // delete axios.defaults.headers.put['Content-Type']
            const formData = new FormData();
            formData.append("file", this.selectedFile);

            try{
                const urlToRequestUrlToUpload = process.env.VUE_APP_REQUEST_URL_TO_UPLOAD_FILE;
                const urlToUpdateStatus = process.env.VUE_APP_SEND_NOTIFICATION_FILE_UPLOADED;

                const requestUrlToUpload = await server.get(urlToRequestUrlToUpload+`?type=`+this.selectedFile.type);
                const { url , code } = await requestUrlToUpload.data;
                
                const uploadFileToCloud = await axios.put(url, this.selectedFile, {
                    headers: {
                        "Content-Type": this.selectedFile.type,
                        'Content-Disposition': `inline; filename="${code}.${this.selectedFile.type.split('/')[1]}"`
                    },
                    onUploadProgress: (e) => {
                        var percentCompleted = Math.round((e.loaded * 100) / e.total);
                        this.upload = `Loading - ${percentCompleted} %` ;
                    }
                })
                const uploadResult = uploadFileToCloud.status;
                this.upload = 'Upload'
                if(uploadResult === 200){
                    this.$refs.file.reset();
                    this.success = `Success, share file code to download`;
                    this.successExpires = `The link will expires and file deleted in 5 minutes!`
                    this.successCode = code 
                    await server.post(urlToUpdateStatus + `${code}.${this.selectedFile.type.split('/')[1]}`);
                    this.selectedFile = null
                }else {
                    this.success = 'Error trying to upload file!'
                }
            }catch (err){ console.error(err);}
        },
    },
    name: 'UploadScreen',
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
  #successCode {
    border: 1px solid;
    padding: 25px;
    border-radius: 100px;
  }
  </style>
  