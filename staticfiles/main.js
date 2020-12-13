document.querySelectorAll(".drop-zone__input").forEach(inputElement=>{
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click",(e)=>{
       inputElement.click();
       if(e.dataTransfer.files.length){
           inputElement.files = e.dataTransfer.files;
           updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
       }
       dropZoneElement.classList.remove("drop-zone--over");
    });

    dropZoneElement.addEventListener("dragover", (e)=>{
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type=>{
        dropZoneElement.addEventListener(type, (e)=>{
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });


    dropZoneElement.addEventListener("drop",(e) => {
       e.preventDefault();
       if(e.dataTransfer.files.length){
           inputElement.files = e.dataTransfer.files;
           updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
       }
       dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    //First time - remove it
    if(dropZoneElement.querySelector(".drop-zone__prompt")){
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    //First time - there is no thumbnail element, create it
    if(!thumbnailElement){
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;
}