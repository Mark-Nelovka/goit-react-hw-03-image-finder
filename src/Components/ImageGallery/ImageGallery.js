import s from "./ImageGallery.module.css";
export default function itemsCard({ children }) {
  return <ul className={s.itemsList}>{children}</ul>;
}
