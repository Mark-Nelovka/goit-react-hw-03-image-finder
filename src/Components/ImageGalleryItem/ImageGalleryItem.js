import axios from "axios";
const KEY = "25305902-07e08e7f18a717a35a2e60aa2";
const BASE_URL = "https://pixabay.com/api/";
const PARAMS = "image_type=photo&orientation=horizontal&per_page=12";
export default function fetchItems(imgName) {
  return axios
    .get(`${BASE_URL}?q=${imgName}&page=1&key=${KEY}&${PARAMS}`)
    .then((response) => {
      const items = response.data.hits;
      //    console.log(items)
      return items.map(({ id, webformatURL, largeImageURL }) => {
        return `<ul>
                            <li key=${id}>
                                <img src=${webformatURL} alt=${"asfc"} />
                            </li>
                        </ul> `;
      });
    })
    .then((result) => {
      console.log(result.join(""));
    });
}
