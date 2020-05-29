import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import {  EmailIcon,  FacebookIcon,  InstapaperIcon,  LineIcon,  LinkedinIcon,  LivejournalIcon,  MailruIcon,  OKIcon,  PinterestIcon,  PocketIcon,  RedditIcon,  TelegramIcon,  TumblrIcon,  TwitterIcon,  ViberIcon,  VKIcon,  WeiboIcon,  WhatsappIcon,  WorkplaceIcon, TwitterShareButton, EmailShareButton, FacebookShareButton,} from "react-share";
import ImageUploading from "react-images-uploading";
import useImage from 'use-image';

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef= React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const [img] = useImage(image.src, 'Anonymous');
  return (
    <>
      <Image
        image={img}
        x={image.x}
        y={image.y}
        // I will use offset to set origin to the center of the image
        draggable 
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
const API_URL = "http://localhost:8080"
const initialimages = [];
const JewelleryEditorComponent = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState(initialimages);
  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
    console.log(imageList);
  };
  const jwellery = [ 
    {
      alt: "Necklace1",
      src: require('./Img/Necklace1.png')
    },
    {
      alt: "Necklace2",
      src: require('./Img/Necklace2.png')
    },
    {
      alt: "Necklace3",
      src: require('./Img/Necklace3.png')
    },
    {
      alt: "EarRing1",
      src: require('./Img/EarRing1.png')
    },
    {
      alt: "EarRing2",
      src: require('./Img/EarRing2.png')
    },
    {
      alt: "EarRing3",
      src: require('./Img/EarRing3.png')
    },
    {
      alt: "Ring1",
      src: require('./Img/Ring1.png')
    },
    {
      alt: "Ring2",
      src: require('./Img/Ring2.png')
    },
    {
      alt: "Ring3",
      src: require('./Img/Ring3.png')
    },
    {
      alt: "Ring4",
      src: require('./Img/Ring4.png')
    },
    {
      alt: "Ring5",
      src: require('./Img/Ring5.png')
    },
  ];
  const jwelleryInfo = {
    name : "Ring",
    price: "500$"
  }
  const logoImg = {
    src: require('./Img/JLogo.png'),
    id: "logoICO",
    width:100,
    height:150
  };
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  let isloading="block";
  const handleExportClick = e => {
   // console.log(stageRef.current.getStage().toDataURL());
   // var w=window.open('about:blank','image from canvas');
   // w.document.write("<img src='"+stageRef.current.getStage().toDataURL()+"' alt='from canvas'/>");
  	let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'Jewellery.png');
    let dataURL = stageRef.current.getStage().toDataURL();
    console.log(dataURL);
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href',url);
    downloadLink.click();
  }


const handleShareTwitterClick = async e => {
    const formData = new FormData();
    let dataURL = stageRef.current.getStage().toDataURL();
    formData.append(0, dataURL);
    let Result = await fetch(`${API_URL}/image-upload`, {method: 'POST',  body: formData });
    Result.json().then(tx => {
      let url = tx.url
      window.open('https://www.facebook.com/home/status='.concat(url), 'twitter-popup', 'height=600,width=600');
    })
  }

const handleShareFacebookClick = async e => {
    const formData = new FormData();
    let dataURL = stageRef.current.getStage().toDataURL();
    formData.append(0, dataURL);
    let Result = await fetch(`${API_URL}/image-upload`, {method: 'POST',  body: formData });
    Result.json().then(tx => {
      let url = tx.url
      window.open('https://www.facebook.com/sharer/sharer.php?u='.concat(url), 'facebook-popup', 'height=600,width=600');
    })
}

const handleSharePinterestClick = async e => {
    const formData = new FormData();
    let dataURL = stageRef.current.getStage().toDataURL();
    formData.append(0, dataURL);
    let Result = await fetch(`${API_URL}/image-upload`, {method: 'POST',  body: formData });
    Result.json().then(tx => {
      let url = tx.url
      window.open('https://pinterest.com/pin/create/button/?url='.concat(url), 'facebook-popup', 'height=350,width=600');
    })
}

const handleShareLinkedinClick = async e => {
    const formData = new FormData();
    let dataURL = stageRef.current.getStage().toDataURL();
    formData.append(0, dataURL);
    let Result = await fetch(`${API_URL}/image-upload`, {method: 'POST',  body: formData });
    Result.json().then(tx => {
      let url = tx.url
      window.open('https://www.linkedin.com/shareArticle?mini=true&url='.concat(url).concat('&title=&summary=&source='), 'linkedin-popup', 'height=350,width=600');
    })
}

const handleShareMailClick = async e => {
    const formData = new FormData();
    let dataURL = stageRef.current.getStage().toDataURL();
    formData.append(0, dataURL);
    let Result = await fetch(`${API_URL}/image-upload`, {method: 'POST',  body: formData });
    Result.json().then(tx => {
      let url = tx.url
      window.open('mailto:info@example.com?&subject=&body='.concat(url).concat('&title=&summary=&source='), 'linkedin-popup', 'height=350,width=600');
    })
}

  return (
    <div style={{display:isloading}}>
      <hr style={{backgroundColor:"#EEE", border:"none", height:"2px"}}></hr>
      <div style={{ display:"flex", alignItems:"center", width:"100%", height:"120px",minWidth:"1024px", whiteSpace:"nowrap", overflowX:"auto", overflowY:"hidden"}}>
        {jwellery.map((jwel, i) => {
          return <img
            src={jwel.src}
            alt={jwel.alt}
            key={i}
            height="100px"
            draggable="true"
            onDragStart={e => {
              dragUrl.current = e.target.src;
            }}
          />
        })}
        
      </div>
      <hr style={{backgroundColor:"#EEE", border:"none", height:"2px"}}></hr>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{padding:"15px 20px"}}>
          <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
            {({ imageList, onImageUpload, onImageRemoveAll }) => (
              // write your building UI
              <div className="upload__image-wrapper" style={{textAlign:"center"}}>
                <button onClick={onImageUpload} style={{border:"none",background:"none",outline:"none"}}><span><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="30px" viewBox="0 -18 512 512" width="30px"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="238" y2="238"><stop offset="0" stopColor="#00f2fe"/><stop offset=".0208" stopColor="#03effe"/><stop offset=".2931" stopColor="#24d2fe"/><stop offset=".5538" stopColor="#3cbdfe"/><stop offset=".7956" stopColor="#4ab0fe"/><stop offset="1" stopColor="#4facfe"/></linearGradient><path d="m432 0h-352c-44.113281 0-80 35.886719-80 80v280c0 44.113281 35.886719 80 80 80h190c7.628906 0 14.59375-4.339844 17.957031-11.191406 3.359375-6.847656 2.53125-15.015625-2.140625-21.046875l-52.3125-67.609375 144.992188-184.425782 93.503906 111.546876v33.726562c0 11.046875 8.953125 20 20 20s20-8.953125 20-20v-221c0-44.113281-35.886719-80-80-80zm-38.671875 111.152344c-3.871094-4.617188-9.609375-7.253906-15.640625-7.148438-6.027344.09375-11.6875 2.898438-15.410156 7.636719l-154.015625 195.894531-52.445313-67.773437c-3.789062-4.898438-9.628906-7.761719-15.816406-7.761719-.007812 0-.019531 0-.027344 0-6.199218.007812-12.046875 2.890625-15.824218 7.804688l-44.015626 57.21875c-6.734374 8.757812-5.097656 21.3125 3.65625 28.046874 8.757813 6.738282 21.3125 5.097657 28.046876-3.65625l28.210937-36.671874 89.1875 115.257812h-149.234375c-22.054688 0-40-17.945312-40-40v-280c0-22.054688 17.945312-40 40-40h352c22.054688 0 40 17.945312 40 40v125.007812zm-253.328125-39.152344c-33.085938 0-60 26.914062-60 60s26.914062 60 60 60 60-26.914062 60-60-26.914062-60-60-60zm0 80c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm372 229c0 11.046875-8.953125 20-20 20h-55v55c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-55h-55c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h55v-55c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v55h55c11.046875 0 20 8.953125 20 20zm0 0" fill="url(#linear0)"/></svg></span></button>&nbsp;
                <button onClick={onImageRemoveAll} style={{border:"none",background:"none",outline:"none"}}><span><svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" ><path fill = "url(#SVGID_1_);" d="M256,163c11.046,0,20,8.954,20,20v228.933c0,11.046-8.954,20-20,20s-20-8.954-20-20V183  C236,171.954,244.954,163,256,163z M326.019,182.127l-10,228.934c-0.482,11.035,8.073,20.372,19.108,20.854  c0.297,0.013,0.593,0.02,0.888,0.02c10.643,0,19.497-8.39,19.966-19.128l10-228.933c0.482-11.035-8.073-20.372-19.108-20.854  C335.856,162.527,326.501,171.092,326.019,182.127z M165.127,163.019c-11.035,0.482-19.59,9.818-19.108,20.854l10,228.933  c0.469,10.738,9.322,19.128,19.966,19.128c0.294,0,0.591-0.006,0.888-0.02c11.035-0.482,19.59-9.818,19.108-20.854l-10-228.934  C185.499,171.092,176.145,162.523,165.127,163.019z M492,103c0,11.046-8.954,20-20,20h-20.712l-17.319,224.538  c-0.809,10.489-9.572,18.463-19.919,18.463c-0.517,0-1.036-0.02-1.56-0.06c-11.013-0.85-19.252-10.466-18.403-21.479L411.169,123  H100.831l24.124,312.758C126.903,456.429,144.001,472,164.778,472h182.444c20.848,0,37.973-15.397,39.834-35.816  c1.003-11,10.723-19.104,21.734-18.101c11,1.003,19.104,10.733,18.101,21.734C423.139,480.968,388.889,512,347.222,512H164.778  c-20.007,0-39.163-7.429-53.939-20.919s-23.914-31.892-25.73-51.816c-0.008-0.093-0.016-0.186-0.023-0.278L60.712,123H40  c-11.046,0-20-8.954-20-20s8.954-20,20-20h121V60c0-33.084,26.916-60,60-60h70c33.084,0,60,26.916,60,60v23h121  C483.046,83,492,91.954,492,103z M201,83h110V60c0-11.028-8.972-20-20-20h-70c-11.028,0-20,8.972-20,20V83z"  fill="url(#linear0)"/></svg></span></button>
                {imageList.map(image => (
                    <div key={image.key} className="image-item" style={{display:"flex", justifyContent:"center", marginBottom:"10px", boxShadow:"0px 0px 20px 20px rgba(200,200,200,0.2"}}>
                    <img src={image.dataURL} alt="" width="150"
                      draggable="true"
                      onDragStart={e => {
                        dragUrl.current = e.target.src;
                      }}
                     />
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <div>

          <div >
            <button onClick={handleExportClick} style={{float:"right",border:"none",background:"none",outline:"none"}}><span><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="40" viewBox="0 -18 512.00016 512" width="40"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="238.00008" y2="238.00008">                  <stop offset="0" stopColor="#00f2fe"/>                  <stop offset=".0208" stopColor="#03effe"/>                  <stop offset=".2931" stopColor="#24d2fe"/>                  <stop offset=".5538" stopColor="#3cbdfe"/>                  <stop offset=".7956" stopColor="#4ab0fe"/>                  <stop offset="1" stopColor="#4facfe"/>                </linearGradient>                <path d="m432 0h-352c-44.113281 0-80 35.886719-80 80v280c0 44.113281 35.886719 80 80 80h214c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20h-14.664062l-45.984376-59.65625 145.144532-184.617188 98.175781 117.121094c5.402344 6.445313 14.261719 8.824219 22.164063 5.949219 7.902343-2.875 13.164062-10.386719 13.164062-18.796875v-180c0-44.113281-35.886719-80-80-80zm40 205.007812-78.671875-93.855468c-3.871094-4.617188-9.609375-7.242188-15.640625-7.148438-6.023438.09375-11.683594 2.898438-15.410156 7.636719l-154.117188 196.023437-52.320312-67.875c-3.785156-4.910156-9.636719-7.789062-15.839844-7.789062-.003906 0-.007812 0-.011719 0-6.203125.003906-12.058593 2.886719-15.839843 7.804688l-44.015626 57.222656c-6.734374 8.753906-5.097656 21.3125 3.65625 28.046875 8.757813 6.734375 21.316407 5.09375 28.050782-3.660157l28.175781-36.632812 88.816406 115.21875h-148.832031c-22.054688 0-40-17.945312-40-40v-280c0-22.054688 17.945312-40 40-40h352c22.054688 0 40 17.945312 40 40zm-332-133.007812c-33.085938 0-60 26.917969-60 60 0 33.085938 26.914062 60 60 60s60-26.914062 60-60c0-33.082031-26.914062-60-60-60zm0 80c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm365.910156 241.628906c7.9375 7.683594 8.144532 20.34375.460938 28.28125l-37.894532 39.148438c-.058593.058594-.117187.121094-.175781.179687-9.453125 9.519531-22.027343 14.761719-35.410156 14.761719-13.339844 0-25.882813-5.210938-35.320313-14.675781l-38.613281-38.085938c-7.863281-7.757812-7.953125-20.417969-.195312-28.28125 7.753906-7.867187 20.417969-7.953125 28.285156-.195312l25.84375 25.492187v-112.253906c0-11.046875 8.957031-20 20-20 11.046875 0 20 8.953125 20 20v111.644531l24.738281-25.554687c7.683594-7.9375 20.347656-8.140625 28.28125-.460938zm0 0" fill="url(#linear0)"/>              </svg></span></button>
            <button onClick={handleShareFacebookClick} id="facebook" style={{border:"none", background:"none"}}><FacebookIcon width="40" height="40" round={true}/></button>
            <button onClick={handleShareTwitterClick} id="twitter" style={{border:"none", background:"none"}}><TwitterIcon  width="40" height="40" round={true}/></button>
            <button onClick={handleSharePinterestClick} id="pinterest" style={{border:"none", background:"none"}}><PinterestIcon  width="40" height="40" round={true}/></button>
            <button onClick={handleShareLinkedinClick} id="linkedin" style={{border:"none", background:"none"}}><LinkedinIcon  width="40" height="40" round={true}/></button>
            <button onClick={handleShareMailClick} id="mail" style={{border:"none", background:"none"}}><EmailIcon  width="40" height="40" round={true}/></button>
          </div>

          <div
            onDrop={e => {
              // register event position
              stageRef.current.setPointersPositions(e);
              // add image
              setImages(
                images.concat([
                  {
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current,
                    id: images.length
                  }
                ])
              );
            }}
            onDragOver={e => e.preventDefault()}
          >
            <Stage
              width={1024}
              height={768}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
              style={{ border: '1px solid #EEE', boxShadow:"0px 0px 20px 10px rgba(245,245,245,0.6)", width:"1024px", height:"768px", margin:"auto"}}
              ref={stageRef}
            >
              <Layer>
                {images.map((image, i) => {
                  return <URLImage image={image} 
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId && image.id !== "logo"}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={newAttrs => {
                      const rects = images.slice();
                      rects[i] = newAttrs;
                      setImages(rects);
                    }}
                  />;
                })}
              </Layer>

              <Layer>
                <Text
                  x={900}
                  y={50}
                  width={200}
                  draggable
                  text = {jwelleryInfo.name}
                  fontFamily = {'Trebuchet MS'}
                  fontSize = {30}
                  fill = '#CC3333'
                />

                <Text
                  x={900}
                  y={100}
                  width={200}
                  draggable
                  text = {jwelleryInfo.price}
                  fontFamily = {'Trebuchet MS'}
                  fontSize = {20}
                  fill = '#FF33FF'
                />
              </Layer>

              <Layer>
                <URLImage image={logoImg} 
                      key={"LogoICON"}
                      shapeProps={logoImg}
                      onChange={newAttrs => {
                      }}
                    />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<JewelleryEditorComponent />, document.getElementById('root'));
