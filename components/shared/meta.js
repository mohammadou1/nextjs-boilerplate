import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
/**
 * @description Meta component to control all meta tags in head, pass any extra data as children
 */
const MetaHead = props => {
  const {
    title,
    keywords,
    description,
    robots,
    ogTitle,
    ogType,
    ogImage,
    ogDescription,
    ogUrl,
    // * extra metas provided as children
    children
  } = props;
  return (
    <Head>
      {title && <title>{title}</title>}
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {ogTitle && <meta name="og:title" content={ogTitle} />}
      {ogType && <meta name="og:type" content={ogType} />}
      {ogImage && <meta name="og:image" content={ogImage} />}
      {ogDescription && <meta name="og:description" content={ogDescription} />}
      {ogUrl && <meta name="og:url" content={ogUrl} />}
      {children}
    </Head>
  );
};

MetaHead.propTypes = {
  /** Page title */
  title: PropTypes.string,
  /** Meta keywords, each keyword is seprated by a comma (,) */
  keywords: PropTypes.string,
  /** Meta description tag, page description */
  description: PropTypes.string,
  /**Meta robots, describes if google will follow / index this page */
  robots: PropTypes.string,
  /** Open graph meta title */
  ogTitle: PropTypes.string,
  /** Open graph meta tag, descripts the type of the item, such as video, audio, product etc.... */
  ogType: PropTypes.string,
  /** Open graph image url */
  ogImage: PropTypes.string,
  /** Open graph description */
  ogDescription: PropTypes.string,
  /**Open graph url */
  ogUrl: PropTypes.string
};

export default MetaHead;
