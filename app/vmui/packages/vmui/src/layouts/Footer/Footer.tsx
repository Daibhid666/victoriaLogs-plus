import { FC, memo } from "preact/compat";
import { LogoShortIcon } from "../../components/Main/Icons";
import "./style.scss";
import { footerLinksToLogs } from "../../constants/footerLinks";
import useGetVersion from "../../hooks/useGetVersion";
import useI18n from "../../i18n/useI18n";

interface Props {
  links?: {
    href: string;
    Icon: FC;
    title: string;
  }[]
}

const Footer: FC<Props> = memo(({ links = footerLinksToLogs }) => {
  const copyrightYears = `2019-${new Date().getFullYear()}`;
  const { version } = useGetVersion();
  const { t } = useI18n();

  return <footer className="vm-footer">
    <a
      className="vm-link vm-footer__website"
      target="_blank"
      href="https://victoriametrics.com/"
      rel="me noreferrer"
    >
      <LogoShortIcon/>
      victoriametrics.com
    </a>
    {links.map(({ href, Icon, title }) => (
      <a
        className="vm-link vm-footer__link"
        target="_blank"
        href={href}
        rel="help noreferrer"
        key={`${href}-${title}`}
      >
        <Icon/>
        {title}
      </a>
    ))}
    <div className="vm-footer__copyright">&copy; {copyrightYears} VictoriaMetrics.</div>
    {version && <span className="vm-footer__version">&nbsp;{t("footer.version")} {version}</span>}
  </footer>;
});

export default Footer;
