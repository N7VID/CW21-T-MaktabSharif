export default function Card({ data }) {
  return (
    <div className="flex flex-col border-2 rounded-lg border-black w-64">
      <img src={data?.images[0]?.image} alt="image" />
      <h2>{data.title}</h2>
      <p>{data.price}</p>
      <p>{data.teacher}</p>
    </div>
  );
}
