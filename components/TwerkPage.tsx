/**
 * Twerk Page - Fully refactored to use generic DancePageTemplate
 * Before: 210 lines of duplicated code
 * After: 8 lines (96% reduction)
 * All sections now use generic components
 */

import React from 'react';
import DancePageTemplate from './templates/DancePageTemplate';
import { TWERK_CONFIG } from '../constants/dance-configs';

const TwerkPage: React.FC = () => {
  return <DancePageTemplate config={TWERK_CONFIG} />;
};

export default TwerkPage;
