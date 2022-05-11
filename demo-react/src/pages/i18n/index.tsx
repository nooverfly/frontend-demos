import i18n from "./i18n";
import { useTranslation } from "react-i18next";

export default function Locale() {
  const { t } = useTranslation();
  const clickHandler = () => {
    i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
  };
  return (
    <div>
      <div>
        {t("name")}: <input type="text" placeholder={t("placeholder.name")} />
      </div>
      <div>
        {t("age")}: <input type="text" placeholder={t("placeholder.age")} />
      </div>
      <div>
        <button onClick={clickHandler}>{t("switch")}</button>
      </div>
    </div>
  );
}
