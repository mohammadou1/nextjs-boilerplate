import { locales } from "~/locales/config";
import { useLocale } from "~/locales";
import { Input } from "reactstrap";

const LocaleSwitcher = () => {
  const { locale, translate } = useLocale();
  const handleLocaleChange = e => {
    const regex = new RegExp(`^/(${locales.join("|")})`);
    const url = window.location.pathname.replace(regex, `/${e.target.value}`);
    window.location.href = url;
  }

  return (
    <Input style={{ width: 100 }} type="select" value={locale} onChange={handleLocaleChange}>
      {locales.map(locale => (
        <option key={locale} value={locale}>
          {translate({ key: `lang_${locale}` })}
        </option>
      ))}
    </Input>

  );
};

export default LocaleSwitcher;
