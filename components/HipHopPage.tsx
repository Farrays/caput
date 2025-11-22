/**
 * Hip Hop Page - Fully refactored to use generic DancePageTemplate
 * Before: 217 lines of duplicated code
 * After: 8 lines (96% reduction)
 * All sections now use generic components
 */

import React from 'react';
import DancePageTemplate from './templates/DancePageTemplate';
import { HIP_HOP_CONFIG } from '../constants/dance-configs';

const HipHopPage: React.FC = () => {
  return <DancePageTemplate config={HIP_HOP_CONFIG} />;
};

export default HipHopPage;
