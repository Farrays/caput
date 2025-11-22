/**
 * Dancehall Page - Fully refactored to use generic DancePageTemplate
 * Before: 210 lines of duplicated code
 * After: 8 lines (96% reduction)
 * All sections now use generic components
 */

import React from 'react';
import DancePageTemplate from './templates/DancePageTemplate';
import { DANCEHALL_CONFIG } from '../constants/dance-configs';

const DancehallPage: React.FC = () => {
  return <DancePageTemplate config={DANCEHALL_CONFIG} />;
};

export default DancehallPage;
