import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import API from '../../../api';
import './styles.scss';

const Accordion = ({ title, data }) => {
  const [isOpened, setIsOpened] = useState(false);

  const remove = async (communeId, isFavorite) => {
    await API.cityToFavorites(communeId, isFavorite);
    // Message & remove
  };

  return (
    <>
      <div className="accordion">
        <div className="accordion__item">
          <button
            className="accordion__title"
            type="button"
            onClick={() => setIsOpened((state) => !state)}
          >
            <div>
              {title} ({data.length})
            </div>
            <div>{isOpened ? <IoChevronUp /> : <IoChevronDown />}</div>
          </button>
          {isOpened
            ? data.map((city) => (
                <div className="accordion__content" key={city.id}>
                  <ul className="accordion__content__ul">
                    <li className="accordion__content__li">
                      {city.details.city_name}
                    </li>
                  </ul>
                  <button
                    className="accordion__content__btn"
                    type="button"
                    onClick={() => remove(city.commune_id, city.is_favorite)}
                  >
                    Retirer
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      commune_id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      is_favorite: PropTypes.bool.isRequired,
      details: PropTypes.shape({
        city_name: PropTypes.string.isRequired,
        population: PropTypes.number.isRequired,
        coordinates: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Accordion;