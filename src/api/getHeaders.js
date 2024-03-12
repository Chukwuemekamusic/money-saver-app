const getHeaders = (q) => {
    return {
      headers: {
        Authorization: `Token ${q}`,
      },
    };
  };

export default getHeaders