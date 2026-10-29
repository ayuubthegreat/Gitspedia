

export const DescriptiveImage = ({src, text}) => {
    const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const img = images[src];
 return (
    <>
    <div>
        <img className="img-fit" src={img}/>
        <p>{text}</p>
    </div>
    
    </>
 )
}