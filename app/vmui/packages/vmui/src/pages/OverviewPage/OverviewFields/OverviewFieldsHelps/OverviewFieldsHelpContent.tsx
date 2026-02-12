import { ctrlKeyLabel } from "../../../../utils/keyboard";
import useI18n from "../../../../i18n/useI18n";

const DocFieldNames = ({ label }: { label: string }) => (
  <a
    href="https://docs.victoriametrics.com/victorialogs/querying/#querying-field-names"
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </a>
);

const DocStreamNames = ({ label }: { label: string }) => (
  <a
    href="https://docs.victoriametrics.com/victorialogs/querying/#querying-stream-field-names"
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </a>
);

const OverviewFieldsHelpContent = () => {
  const { t } = useI18n();

  return (
    <div className="vm-overview-fields-tour-content vm-markdown">
      <p dangerouslySetInnerHTML={{ __html: t("help.intro") }}/>

      <hr/>

      <h2>{t("help.namesTableTitle")}</h2>
      <p>
        <span dangerouslySetInnerHTML={{ __html: t("help.namesTableDesc") }}/><br/>
        {t("help.docs")} <DocFieldNames label={t("help.docFieldNames")}/> and <DocStreamNames label={t("help.docStreamNames")}/>
      </p>

      <h3>{t("help.columns")}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("help.hitsCol") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.coverageCol") }}/>
      </ul>

      <h3>{t("help.clickBehavior")}</h3>
      <ul>
        <li>{t("help.clickRowFocus")}</li>
        <li dangerouslySetInnerHTML={{ __html: t("help.ctrlClickExclude").replace("{ctrlKey}", ctrlKeyLabel) }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.seeRowActions") }}/>
      </ul>

      <hr/>

      <h2>{t("help.valuesTableTitle")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("help.valuesTableDesc") }}/>

      <h3>{t("help.selectors")}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("help.modeSelector") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.topNSelector") }}/>
      </ul>

      <h3>{t("help.columns")}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("help.valuesHitsCol") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.valuesPercentCol") }}/>
      </ul>

      <h3>{t("help.clickBehavior")}</h3>
      <ul>
        <li>{t("help.valuesClickRowFocus")}</li>
        <li dangerouslySetInnerHTML={{ __html: t("help.ctrlClickExclude").replace("{ctrlKey}", ctrlKeyLabel) }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.valuesSeeRowActions") }}/>
      </ul>

      <hr/>

      <h2 id="row-actions">{t("help.rowActionsTitle")}</h2>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("help.focusAction") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.includeAction") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.excludeAction") }}/>
        <li dangerouslySetInnerHTML={{ __html: t("help.copyAction") }}/>
      </ul>

      <p dangerouslySetInnerHTML={{ __html: t("help.note") }}/>

      <hr/>

      <p><em dangerouslySetInnerHTML={{ __html: t("help.footnote") }}/></p>
    </div>
  );
};

export default OverviewFieldsHelpContent;
