import React from 'react';
import { createRoot } from 'react-dom/client';

declare const USE_MOCK_DATA: boolean;

const App = () => (
	<div>Plusgrade Tax Calculator</div>
);

const root = createRoot(document.getElementById('root') as Element);
root.render(App());
