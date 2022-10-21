import store from "@/store";

const FilterProvince = (idProvince) => {
  const provinces = store.state.dataLocationVietNam.filter(
    (local) => local.code == idProvince
  );

  return provinces[0].name;
};

export default FilterProvince;
