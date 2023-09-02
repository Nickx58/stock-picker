import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { Search, List } from 'semantic-ui-react'; // Import the Search and List components
import StockDetail from './components/StockDetail';
import matches from './mocks/mockBestMatch';
import mockStockDetail from './mocks/mockStockDetail'
import timeSeriesMock from './mocks/mockTimeSeries'
import './index.css'
import StockChart from './components/StockChart';

const App = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stockDetail, setStockDetails] = useState(null);
  const [stockChart, setStockChart] = useState(null);
  const [error, setError] = useState(null);

  const debouncedSearch = debounce(async (searchQuery) => {
    try {
      setIsLoading(true);
      await new Promise((resolve, reject) => setTimeout(resolve, 100))
      setSearchResults(matches.bestMatches || []); // Update searchResults
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
      setIsLoading(false);
    }
  }, 300);

  const handleSearchChange = (e, { value }) => {
    setQuery(value);
    debouncedSearch(value);
  }

  const fetchStockOverview = async (symbol) => {
    try {
      setIsLoading(true);
      //const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
       //await fetch(url);
      await new Promise((resolve, reject) => setTimeout(resolve, 100))
      //const data = await response.json();
      setStockDetails(mockStockDetail); // Store the detailed stock information
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setStockDetails(null);
      setIsLoading(false);
    }
  };

  const formatStockPriceData = (timeSeriesData) => {
    console.log(timeSeriesData, 'timeSeriesData')
    const timestamps = Object.keys(timeSeriesData).reverse();
    const prices = timestamps.map((timestamp) => ({
      date: timestamp,
      price: parseFloat(timeSeriesData[timestamp]['4. close']),
    }));
    return prices;
  };

  const fetchTimeSeries = async (symbol) => {
    try {
      setIsLoading(true);
      //const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
      //const response = await fetch(url);
      //const data = await response.json();
      // Extract and format the stock price data for charting
      await new Promise((resolve, reject) => setTimeout(resolve, 100))
      const chartData = formatStockPriceData(timeSeriesMock['Time Series (Daily)']);
      setStockChart(chartData);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setStockChart(null);
      setIsLoading(false);
    }
  };


  const handleResultSelect = (event, {result}) => {
    const stockSymbol = result['1. symbol'];
    fetchStockOverview(stockSymbol)
    fetchTimeSeries(stockSymbol)
  }

  // Custom result renderer for the Search component
  const resultRenderer = (props) => {
    return (
      <List.Item>
        <List.Content>
          <List.Header>{props['1. symbol']}</List.Header>
          <List.Description>
            <div>Name: {props['2. name']}</div>
          </List.Description>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <div>
      <header className='app-header'>
        <h2 className='header-text'>Stock Symbol Search</h2>
        <Search
          placeholder="Enter a stock symbol"
          loading={isLoading}
          onSearchChange={handleSearchChange}
          value={query}
          results={searchResults}
          resultRenderer={resultRenderer}
          onResultSelect={handleResultSelect}
          fluid
        />
        <div />
        <div />
      </header>
      <div className='app-body'>
        {stockDetail && <StockDetail stockDetail={stockDetail} /> }
        {stockChart && <StockChart stockPriceData={stockChart} />}
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
