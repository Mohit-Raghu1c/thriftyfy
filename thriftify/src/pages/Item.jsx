import { useParams } from "react-router-dom";
import CardFull from "../components/CardFull";
import { useState, useEffect } from "react";


export default function Item()
{
    const { id } = useParams();

    const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`https://thriftify-pa6z.onrender.com/api/item/${id}`);
      const data = await res.json();
      setItem(data);
    };

    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return <>
    <CardFull props={item}/>
  </>
}