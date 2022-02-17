import axios from "axios";
import PropTypes from "prop-types";
const KEY = "25305902-07e08e7f18a717a35a2e60aa2";
const BASE_URL = "https://pixabay.com/api/";
const PARAMS = "image_type=photo&orientation=horizontal&per_page=12";
export default function fetchApi(imageName, page) {
  return axios
    .get(`${BASE_URL}?q=${imageName}&page=${page}&key=${KEY}&${PARAMS}`)
    .then((response) => {
      if (response.data.hits.length > 0) {
        return response.data.hits;
      }
      return Promise.reject(new Error(`Нет такой картинки`));
    });
}

fetchApi.propTypes = {
  imageName: PropTypes.string,
  page: PropTypes.number,
};
