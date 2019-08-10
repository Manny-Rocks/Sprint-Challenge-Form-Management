   import React from 'react';
import '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { render, fireEvent } from '@testing-library/react';
import FormikMyForm from './Form';

describe('<FormikMyForm />', () => {
    it('renders without crashing', () => {
        render(<FormikMyForm />)
    })
    it("submit fires", () => {
        // Tests if FormikForm renders
        const { getByText } = render(<FormikMyForm />);
      
        // Grabs element with the exact text of strike which is why we use $ 
        const submitButton = getByText(/^submit$/i);
      
        //Manually click button
        fireEvent.click(submitButton);
      
        // Test if on click of submit button nothing is displayed because username and password inputs are not filed
        getByText(/Recipes/);})
    
});
