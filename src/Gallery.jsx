import { useQuery } from "@tanstack/react-query";
import { customFetch } from "./axios";
import { useAppContext } from "./context";

const Gallery = () => {
  const { searchTerm } = useAppContext();
  const {
    isLoading,
    data: imageData,
    isError,
  } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const response = await customFetch.get(
        `/search/photos?query=${searchTerm}`
      );
      return response.data;
    },
  });
  console.log(imageData);
  if (isLoading) {
    return (
      <section className='image-container'>
        <h4>loading...</h4>
      </section>
    );
  }
  if (isError) {
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
      </section>
    );
  }
  const results = imageData.results;
  if (results.length === 0) {
    return (
      <section className='image-container'>
        <h4>No results found</h4>
      </section>
    );
  }
  return (
    <section className='image-container'>
      {results.map((item) => {
        return (
          <img
            className='img'
            src={item?.urls?.regular}
            alt={item?.alt_description}
            key={item?.id}
          />
        );
      })}
    </section>
  );
};
export default Gallery;
