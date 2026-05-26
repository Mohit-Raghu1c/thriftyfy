import {
    useState,
    useEffect
} from "react";

import {
    useSearchParams
} from "react-router-dom";

import CardHor from "../components/CardHor";


export default function Search() {

    const [params] = useSearchParams();

    const query = params.get("q") || "";


    const [items, setItems] = useState([]);


    // FILTER STATES
    const [category, setCategory] = useState("");

    const [condition, setCondition] = useState("");

    const [priceRange, setPriceRange] = useState("");

    const [sort, setSort] = useState("");


    // FETCH ITEMS
    useEffect(() => {

        const fetchItems = async () => {

            try {

                let url =
                    `https://thriftify-pa6z.onrender.com/api/search?q=${query}`;


                // CATEGORY
                if (category) {

                    url += `&category=${category}`;
                }


                // CONDITION
                if (condition) {

                    url += `&condition=${condition}`;
                }


                // PRICE RANGE
                if (priceRange === "0-500") {

                    url += `&minPrice=0&maxPrice=500`;
                }

                else if (priceRange === "500-1000") {

                    url += `&minPrice=500&maxPrice=1000`;
                }

                else if (priceRange === "1000+") {

                    url += `&minPrice=1000`;
                }


                // SORT
                if (sort) {

                    url += `&sort=${sort}`;
                }


                const res = await fetch(url);

                const data = await res.json();

                setItems(data);

            } catch (err) {

                console.error(err);
            }
        };

        fetchItems();

    }, [
        query,
        category,
        condition,
        priceRange,
        sort
    ]);


    return (

        <>

            {/* FILTERS */}
            <div className="container my-4">

                <div className="row g-3">


                    {/* CATEGORY */}
                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="">
                                Category
                            </option>

                            <option value="Shirt">
                                Shirts
                            </option>

                            <option value="Jacket">
                                Jackets
                            </option>

                            <option value="Hoodie">
                                Hoodies
                            </option>

                        </select>

                    </div>


                    {/* CONDITION */}
                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={condition}
                            onChange={(e) =>
                                setCondition(e.target.value)
                            }
                        >

                            <option value="">
                                Condition
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐+
                            </option>

                            <option value="3">
                                ⭐⭐⭐+
                            </option>

                            <option value="2">
                                ⭐⭐+
                            </option>

                        </select>

                    </div>


                    {/* PRICE */}
                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(e.target.value)
                            }
                        >

                            <option value="">
                                Price Range
                            </option>

                            <option value="0-500">
                                ₹0 - ₹500
                            </option>

                            <option value="500-1000">
                                ₹500 - ₹1000
                            </option>

                            <option value="1000+">
                                ₹1000+
                            </option>

                        </select>

                    </div>


                    {/* SORT */}
                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                        >

                            <option value="">
                                Sort By
                            </option>

                            <option value="newest">
                                Newest
                            </option>

                            <option value="price_asc">
                                Price Low to High
                            </option>

                            <option value="price_desc">
                                Price High to Low
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* TITLE */}
            <div className="container mb-4">

                <h3>

                    Search Results for "{query}"

                </h3>

                <p className="text-muted">

                    {items.length} items found

                </p>

            </div>


            {/* ITEMS */}
            <div className="container">

                {
                    items.length > 0 ? (

                        items.map((item) => (

                            <CardHor
                                key={item._id}
                                props={item}
                            />
                        ))
                    )

                        :

                        (

                            <div className="alert alert-secondary">

                                No items found

                            </div>
                        )
                }

            </div>

        </>
    );
}