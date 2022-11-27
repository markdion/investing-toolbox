import { Box, Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Toolbar, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Home from "../../Home";
import ColorTextBox from "../shared/ColorTextBox";
import PercentTextField from "../shared/PercentTextField";
import NumberTextField from "../shared/NumberTextField";

export default function Active() {

  const grossMarginGood = 0.4;
  const netMarginGood = 0.2;
  const netMarginOk = 0.1;
  const returnOnEquityGood = 0.3;
  const returnOnEquityOk = 0.1;
  const debtTestGood = 1;
  const expendituresRatioGood = -0.25;
  const expendituresRatioOk = -0.5;

  const [companyTicker, setCompanyTicker] = useState("");
  const [reportedCurrency, setReportedCurrency] = useState("USD");
  const [latestYear, setLatestYear] = useState(null);
  const [numbers, setNumbers] = useState({});
  const [growthRateFirst, setGrowthRateFirst] = useState({});
  const [growthRateLast, setGrowthRateLast] = useState({});
  const [terminalMultiple, setTerminalMultiple] = useState({});
  const [discountRate, setDiscountRate] = useState(10);
  const [earningsType, setEarningsType] = useState("epsAndDividend");
  const [dividendsWillGrow, setDividendsWillGrow] = useState(true);
  const [valuationNormal, setValuationNormal] = useState(0);
  const [valuationBest, setValuationBest] = useState(0);
  const [valuationWorst, setValuationWorst] = useState(0);

  // Income Statement
  // Annual: Revenue, Net Income, Gross Margin                = Net Income Growth Rate, Net Margin
  // Annual Growth: Net Income Growth Rate

  // Balance Sheet
  // Annual: Retained Earnings, Long-term Debt  = 4 Year Debt Test

  // Cash Flow Statement
  // Annual: Capital Expenditures, Free Cash Flow

  async function getIncomeStatements(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/income-statement/${companyTicker}?limit=120&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch income statements for " + companyTicker);
    }
  }

  async function getIncomeStatementsGrowth(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/income-statement-growth/${companyTicker}?limit=40&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch income statements growth for " + companyTicker);
    }
  }

  async function getBalanceSheets(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/balance-sheet-statement/${companyTicker}?limit=120&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch balance sheets for " + companyTicker);
    }
  }

  async function getCashFlowStatements(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/cash-flow-statement/${companyTicker}?limit=120&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch cash flow statements for " + companyTicker);
    }
  }

  async function getCashFlowStatementsGrowth(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/cash-flow-statement-growth/${companyTicker}?limit=120&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch cash flow statements growth for " + companyTicker);
    }
  }

  async function getFinancialRatios(companyTicker) {
    let response = await fetch(`https://fmpcloud.io/api/v3/ratios/${companyTicker}?limit=120&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch financial ratios for " + companyTicker);
    }
  }

  async function getNumbers(companyTicker) {

    if (!companyTicker) {
      return;
    }

    let incomeStatements = await getIncomeStatements(companyTicker);
    let incomeStatementsGrowth = await getIncomeStatementsGrowth(companyTicker);
    let balanceSheets = await getBalanceSheets(companyTicker);
    let cashFlowStatements = await getCashFlowStatements(companyTicker);
    let cashFlowStatementsGrowth = await getCashFlowStatementsGrowth(companyTicker);
    let financialRatios = await getFinancialRatios(companyTicker);

    const _numbers = {};
    const latestYear = parseInt(incomeStatements.map(e => e["calendarYear"] ?? e["date"].substring(0, 4)).sort().reverse()[0]);
    setLatestYear(latestYear);

    for (let i = latestYear; i > latestYear - 5; i--) {
      let currentYearIncomeStatement = incomeStatements.find(e => (e["calendarYear"] ?? e["date"].substring(0, 4)) === i.toString()) ?? {};
      let currentYearIncomeStatementGrowth = incomeStatementsGrowth.find(e => e["date"].includes(i.toString())) ?? {};
      let currentYearBalanceSheet = balanceSheets.find(e => (e["calendarYear"] ?? e["date"].substring(0, 4)) === i.toString()) ?? {};
      let currentYearCashFlowStatement = cashFlowStatements.find(e => (e["calendarYear"] ?? e["date"].substring(0, 4)) === i.toString()) ?? {};
      let currentYearCashFlowStatementGrowth = cashFlowStatementsGrowth.find(e => e["date"].includes(i.toString())) ?? {};
      let currentYearFinancialRatios = financialRatios.find(e => e["date"].includes(i.toString())) ?? {};

      if (i === latestYear) {
        setReportedCurrency(currentYearBalanceSheet["reportedCurrency"]);
      }

      let revenue = currentYearIncomeStatement["revenue"];
      let netIncome = currentYearIncomeStatement["netIncome"];
      let dilutedEPS = currentYearIncomeStatement["epsdiluted"];
      let netIncomeGrowth = currentYearIncomeStatementGrowth.hasOwnProperty("growthNetIncome") ? currentYearIncomeStatementGrowth["growthNetIncome"] : 0;
      let grossMargin = currentYearIncomeStatement.hasOwnProperty("grossProfitRatio") ? currentYearIncomeStatement["grossProfitRatio"] : 0;
      let netMargin = (revenue !== 0) ? netIncome / revenue : 0;
      let retainedEarnings = currentYearBalanceSheet.hasOwnProperty("retainedEarnings") ? currentYearBalanceSheet["retainedEarnings"] : 0;
      let returnOnEquity = currentYearFinancialRatios.hasOwnProperty("returnOnEquity") ? currentYearFinancialRatios["returnOnEquity"] : 0;
      let freeCashFlowPerShare = currentYearFinancialRatios.hasOwnProperty("freeCashFlowPerShare") ? currentYearFinancialRatios["freeCashFlowPerShare"] : 0;
      let longTermDebt = currentYearBalanceSheet.hasOwnProperty("longTermDebt") ? currentYearBalanceSheet["longTermDebt"] : 0;
      let debtTest = (longTermDebt !== 0) ? netIncome * 4 / longTermDebt : 1.1;
      let capitalExpenditure = currentYearCashFlowStatement.hasOwnProperty("capitalExpenditure") ? currentYearCashFlowStatement["capitalExpenditure"] : 0;
      let expenditureRatio = (netIncome !== 0) ? capitalExpenditure / netIncome : 0;
      let freeCashFlow = currentYearCashFlowStatement.hasOwnProperty("freeCashFlow") ? currentYearCashFlowStatement["freeCashFlow"] : 0;
      let dividendsPaid = currentYearCashFlowStatement.hasOwnProperty("dividendsPaid") ? currentYearCashFlowStatement["dividendsPaid"] : 0;
      let freeCashFlowGrowth = currentYearCashFlowStatementGrowth.hasOwnProperty("growthFreeCashFlow") ? currentYearCashFlowStatementGrowth["growthFreeCashFlow"] : 0;

      let sharesOutstanding = freeCashFlow / freeCashFlowPerShare;
      let dividendPerShare = -dividendsPaid / sharesOutstanding;

      _numbers[i.toString()] = {
        revenue,
        netIncome,
        dilutedEPS,
        netIncomeGrowth,
        grossMargin,
        netMargin,
        retainedEarnings,
        returnOnEquity, 
        longTermDebt,
        debtTest,
        capitalExpenditure,
        expenditureRatio,
        freeCashFlow,
        freeCashFlowGrowth,
        sharesOutstanding,
        dividendPerShare
      }
    }
    console.log(_numbers);
    return _numbers;
  }

  function calculateFutureValueFromCashFlows(currentCashFlow, growthRateFirstFiveYears, growthRateLastFiveYears, discountRate, terminalMultiple) {
    let totalDiscountedCashFlow = 0;
    let cashFlow = currentCashFlow;
    let terminalCashFlow = 0;
    for (let year = 1; year < 6; year++) {
      cashFlow = cashFlow * (1 + (growthRateFirstFiveYears / 100));
      let discountedCashFlow = cashFlow / Math.pow(1 + (discountRate / 100), year);
      totalDiscountedCashFlow += discountedCashFlow;
    }
    for (let year = 6; year < 11; year++) {
      cashFlow = cashFlow * (1 + (growthRateLastFiveYears / 100));
      if (year === 9) {
        terminalCashFlow = cashFlow;
      }
      let discountedCashFlow = cashFlow / Math.pow(1 + (discountRate / 100), year);
      totalDiscountedCashFlow += discountedCashFlow;
    }
    
    let terminalValue = terminalCashFlow * terminalMultiple / Math.pow(1 + (discountRate / 100), 10);
    return totalDiscountedCashFlow + terminalValue;
  }

  function calculateFutureValueFromEPS(currentEPS, currentDividend, growthRateFirstFiveYears, growthRateLastFiveYears, discountRate, terminalMultiple, dividendWillGrow = false) {
    let totalDiscountedDividends = 0;
    let eps = currentEPS;
    let dividend = currentDividend;
    let terminalEPS = 0;
    for (let year = 1; year < 6; year++) {
      eps = eps * (1 + (growthRateFirstFiveYears / 100));
      if (dividendWillGrow) {
        dividend = dividend * (1 + (growthRateFirstFiveYears / 100));
      }
      let discountedDividend = dividend / Math.pow(1 + (discountRate / 100), year);
      totalDiscountedDividends += discountedDividend;
    }
    for (let year = 6; year < 11; year++) {
      eps = eps * (1 + (growthRateLastFiveYears / 100));
      if (year === 9) {
        terminalEPS = eps;
      }
      if (dividendWillGrow) {
        dividend = dividend * (1 + (growthRateLastFiveYears / 100));
      }
      let discountedDividend = dividend / Math.pow(1 + (discountRate / 100), year);
      totalDiscountedDividends += discountedDividend;
    }
    
    let terminalValue = terminalEPS * terminalMultiple / Math.pow(1 + (discountRate / 100), 10);
    return totalDiscountedDividends + terminalValue;
  }

  async function getNumbersMock(companyTicker) {
    return {
      "2018": {
        "revenue": 265595000000,
        "netIncome": 59531000000,
        "netIncomeGrowth": 0.23122582780087278,
        "grossMargin": 0.38343718820007905,
        "netMargin": 0.22414202074587247,
        "retainedEarnings": 70400000000,
        "returnOnEquity": 0.5556011834209077,
        "longTermDebt": 93735000000,
        "debtTest": 2.540395796660799,
        "capitalExpenditure": -13313000000,
        "expenditureRatio": -0.2236313853286523,
        "freeCashFlow": 64121000000
      },
      "2019": {
        "revenue": 260174000000,
        "netIncome": 55256000000,
        "netIncomeGrowth": -0.07181132519191681,
        "grossMargin": 0.3781776810903472,
        "netMargin": 0.21238094505984456,
        "retainedEarnings": 45898000000,
        "returnOnEquity": 0.6106445053487756,
        "longTermDebt": 91807000000,
        "debtTest": 2.407485268007886,
        "capitalExpenditure": -10495000000,
        "expenditureRatio": -0.18993412480092658,
        "freeCashFlow": 58896000000
      },
      "2020": {
        "revenue": 274515000000,
        "netIncome": 57411000000,
        "netIncomeGrowth": 0.039000289561314606,
        "grossMargin": 0.38233247727810865,
        "netMargin": 0.20913611278072236,
        "retainedEarnings": 14966000000,
        "returnOnEquity": 0.8786635853012749,
        "longTermDebt": 98667000000,
        "debtTest": 2.327465109915169,
        "capitalExpenditure": -7309000000,
        "expenditureRatio": -0.1273100973681002,
        "freeCashFlow": 73365000000
      },
      "2021": {
        "revenue": 365817000000,
        "netIncome": 94680000000,
        "netIncomeGrowth": 0.649161310550243,
        "grossMargin": 0.4177935962516778,
        "netMargin": 0.2588179335569424,
        "retainedEarnings": 5562000000,
        "returnOnEquity": 1.5007132667617689,
        "longTermDebt": 109106000000,
        "debtTest": 3.471119828423735,
        "capitalExpenditure": -11085000000,
        "expenditureRatio": -0.11707858048162231,
        "freeCashFlow": 92953000000
      }
    };
  }

  function averageNetIncomeGrowthRate() {
    return Object.entries(numbers).reduce((previousValue, [currYear, currStats]) => previousValue + currStats.netIncomeGrowth, 0) / Object.keys(numbers).length;
  }
  
  function averageFreeCashFlowGrowthRate() {
    return Object.entries(numbers).reduce((previousValue, [currYear, currStats]) => previousValue + currStats.freeCashFlowGrowth, 0) / Object.keys(numbers).length;
  }

  function asPercent(value, decimalPlaces = 2) {
    return (value * 100).toFixed(decimalPlaces) + "%";
  }

  function grossMarginColor(grossMargin) {
    return grossMargin > grossMarginGood ? "green" : "transparent";
  }

  function grossMarginTextColor(grossMargin) {
    return grossMargin > grossMarginGood ? "white" : "black";
  }

  function netMarginColor(netMargin) {
    return netMargin > netMarginGood ? "green" : netMargin > netMarginOk ? "yellow" : "red";
  }

  function netMarginTextColor(netMargin) {
    return netMargin > netMarginGood || netMargin < netMarginOk ? "white" : "black";
  }

  function returnOnEquityColor(returnOnEquity) {
    return returnOnEquity > returnOnEquityGood ? "green" : returnOnEquity > returnOnEquityOk ? "yellow" : "red";
  }

  function returnOnEquityTextColor(returnOnEquity) {
    return returnOnEquity > returnOnEquityGood || returnOnEquity < returnOnEquityOk ? "white" : "black";
  }

  function expenditureRatioColor(expenditureRatio) {
    return expenditureRatio > expendituresRatioGood ? "green" : expenditureRatio > expendituresRatioOk ? "yellow" : "red";
  }

  function expenditureRatioTextColor(expenditureRatio) {
    return expenditureRatio > expendituresRatioGood || expenditureRatio < expendituresRatioOk ? "white" : "black";
  }

  return (
    <Home body={
      <div>
        <Toolbar />
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          gap: "1rem 0"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <TextField
                sx={{ margin: "1rem" }}
                label="Company Ticker"
                value={companyTicker}
                onChange={(event) => {
                  setCompanyTicker(event.target.value);
                }}
              />
            <Button
              sx={{ margin: "1rem 0", width: "fit-content" }}
              variant="contained"
              color="secondary"
              onClick={async () => {
                let nums = await getNumbers(companyTicker);
                setNumbers(nums);
              }}>
              Fetch Numbers
            </Button>
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <Typography variant="h6" align="center">Year</Typography>
              <ColorTextBox value="Gross Margin" color="transparent" textColor="black" />
              <ColorTextBox value="Net Margin" color="transparent" textColor="black" />
              <ColorTextBox value="Return on Equity" color="transparent" textColor="black" />
              <ColorTextBox value="4 Year Debt Test" color="transparent" textColor="black" />
              <ColorTextBox value="Expenditure Ratio" color="transparent" textColor="black" />
              <Box height={20}/>
              <Typography variant="h6" align="center">Other Numbers</Typography>
              <Typography align="center">Shares Outstanding</Typography>
              <Typography align="center">Revenue</Typography>
              <Typography align="center">Net Income</Typography>
              <Typography align="center">Retained Earnings</Typography>
              <Typography align="center">Long-Term Debt</Typography>
              <Typography align="center">Capital Expenditures</Typography>
              <Typography align="center">Free Cash Flow</Typography>
              <Typography align="center">Diluted EPS</Typography>
              <Typography align="center">Dividend Per Share</Typography>
            </Box>
            {numbers &&
              Object.entries(numbers).reverse().map(([year, stats], index) => (
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    gap: "1rem"
                  }}
                  key={year}
                >
                  <Typography variant="h6" align="center">{year}</Typography>
                  <ColorTextBox value={asPercent(stats.grossMargin)} color={grossMarginColor(stats.grossMargin)} textColor={grossMarginTextColor(stats.grossMargin)} />
                  <ColorTextBox value={asPercent(stats.netMargin)} color={netMarginColor(stats.netMargin)} textColor={netMarginTextColor(stats.netMargin)} />
                  <ColorTextBox value={asPercent(stats.returnOnEquity)} color={returnOnEquityColor(stats.returnOnEquity)} textColor={returnOnEquityTextColor(stats.returnOnEquity)} />
                  <Typography align="center">{
                    stats.debtTest > debtTestGood
                      ? <CheckIcon color="success"/>
                      : <CloseIcon color="error"/>
                    }
                  </Typography>
                  <ColorTextBox value={asPercent(stats.expenditureRatio)} color={expenditureRatioColor(stats.expenditureRatio)} textColor={expenditureRatioTextColor(stats.expenditureRatio)} />
                  <Box height={70}/>
                  <Typography align="center">{stats.sharesOutstanding.toLocaleString()}</Typography>
                  <Typography align="center">{stats.revenue.toLocaleString()}</Typography>
                  <Typography align="center">{stats.netIncome.toLocaleString()}</Typography>
                  <Typography align="center">{stats.retainedEarnings.toLocaleString()}</Typography>
                  <Typography align="center">{stats.longTermDebt.toLocaleString()}</Typography>
                  <Typography align="center">{stats.capitalExpenditure.toLocaleString()}</Typography>
                  <Typography align="center">{stats.freeCashFlow.toLocaleString()}</Typography>
                  <Typography align="center">{stats.dilutedEPS.toLocaleString()}</Typography>
                  <Typography align="center">{stats.dividendPerShare.toLocaleString()}</Typography>
                </Box>
              ))
            }
          </Box>
          <Typography align="justify">{"Reported Currency: " + reportedCurrency}</Typography>
          <Typography align="justify">{"Net Income Growth Rate: " + asPercent(averageNetIncomeGrowthRate())}</Typography>
          <Typography align="justify">{"Free Cash Flow Growth Rate: " + asPercent(averageFreeCashFlowGrowthRate())}</Typography>
          <Typography variant="h6" align="center">Intrinsic Value Calculation</Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <PercentTextField
              sx={{ margin: "1rem" }}
              label={"Discount Rate"}
              value={discountRate}
              onChange={(val) => {
                setDiscountRate(val);
              }}
            />
            <FormControl>
              <RadioGroup
                defaultValue="epsAndDividend"
                name="earnings-type-radio-buttons-group"
                onChange={(event, value) => {
                  setEarningsType(value);
                }}
              >
                <FormControlLabel value="epsAndDividend" control={<Radio />} label="EPS + Dividend" />
                <FormControlLabel value="freeCashFlow" control={<Radio />} label="Free Cash Flow" />
              </RadioGroup>
            </FormControl>
            <FormControlLabel control={<Checkbox checked={dividendsWillGrow} onChange={((event) => setDividendsWillGrow(event.target.checked))} />} label="Dividends Will Grow" />
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <Typography sx={{ my: 4 }} align="center">Normal Case</Typography>
              <Typography sx={{ my: 4 }} align="center">Best Case</Typography>
              <Typography sx={{ my: 4 }} align="center">Worst Case</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (First 5 Years)"
                value={growthRateFirst.normal}
                onChange={(val) => {
                  setGrowthRateFirst({
                    ...growthRateFirst,
                    normal: val
                  });
                }}
              />
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (First 5 Years)"
                value={growthRateFirst.best}
                onChange={(val) => {
                  setGrowthRateFirst({
                    ...growthRateFirst,
                    best: val
                  });
                }}
              />
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (First 5 Years)"
                value={growthRateFirst.worst}
                onChange={(val) => {
                  setGrowthRateFirst({
                    ...growthRateFirst,
                    worst: val
                  });
                }}
              />
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (Last 5 Years)"
                value={growthRateLast.normal}
                onChange={(val) => {
                  setGrowthRateLast({
                    ...growthRateLast,
                    normal: val
                  });
                }}
              />
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (Last 5 Years)"
                value={growthRateLast.best}
                onChange={(val) => {
                  setGrowthRateLast({
                    ...growthRateLast,
                    best: val
                  });
                }}
              />
              <PercentTextField
                sx={{ margin: "1rem" }}
                label="Growth Rate (Last 5 Years)"
                value={growthRateLast.worst}
                onChange={(val) => {
                  setGrowthRateLast({
                    ...growthRateLast,
                    worst: val
                  });
                }}
              />
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <NumberTextField
                sx={{ margin: "1rem" }}
                label="Terminal Multiple (P/E Ratio after 10 Years)"
                value={terminalMultiple.normal}
                onChange={(val) => {
                  setTerminalMultiple({
                    ...terminalMultiple,
                    normal: val
                  });
                }}
              />
              <NumberTextField
                sx={{ margin: "1rem" }}
                label="Terminal Multiple (P/E Ratio after 10 Years)"
                value={terminalMultiple.best}
                onChange={(val) => {
                  setTerminalMultiple({
                    ...terminalMultiple,
                    best: val
                  });
                }}
              />
              <NumberTextField
                sx={{ margin: "1rem" }}
                label="Terminal Multiple (P/E Ratio after 10 Years)"
                value={terminalMultiple.worst}
                onChange={(val) => {
                  setTerminalMultiple({
                    ...terminalMultiple,
                    worst: val
                  });
                }}
              />
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "1rem"
              }}
            >
              <Typography sx={{ my: 3.5 }} variant="h6" align="center">{valuationNormal.toLocaleString()}</Typography>
              <Typography sx={{ my: 3.5 }} variant="h6" align="center">{valuationBest.toLocaleString()}</Typography>
              <Typography sx={{ my: 3.5 }} variant="h6" align="center">{valuationWorst.toLocaleString()}</Typography>
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <Button
              sx={{ margin: "1rem 0", width: "fit-content" }}
              variant="contained"
              color="secondary"
              onClick={async () => {
                let normal = 0;
                let best = 0;
                let worst = 0;
                if (earningsType === "epsAndDividend") {
                  let latestDividend = numbers[latestYear].dividendPerShare;
                  let latestEPS = numbers[latestYear].dilutedEPS;
                  normal = calculateFutureValueFromEPS(latestEPS, latestDividend, growthRateFirst.normal, growthRateLast.normal, discountRate, terminalMultiple.normal, dividendsWillGrow);
                  best = calculateFutureValueFromEPS(latestEPS, latestDividend, growthRateFirst.best, growthRateLast.best, discountRate, terminalMultiple.best, dividendsWillGrow);
                  worst = calculateFutureValueFromEPS(latestEPS, latestDividend, growthRateFirst.worst, growthRateLast.worst, discountRate, terminalMultiple.worst, dividendsWillGrow);
                } else {
                  let latestFreeCashFlow = numbers[latestYear].freeCashFlow;
                  normal = calculateFutureValueFromCashFlows(latestFreeCashFlow, growthRateFirst.normal, growthRateLast.normal, discountRate, terminalMultiple.normal);
                  best = calculateFutureValueFromCashFlows(latestFreeCashFlow, growthRateFirst.best, growthRateLast.best, discountRate, terminalMultiple.best);
                  worst = calculateFutureValueFromCashFlows(latestFreeCashFlow, growthRateFirst.worst, growthRateLast.worst, discountRate, terminalMultiple.worst);
                }
                setValuationNormal(normal);
                setValuationBest(best);
                setValuationWorst(worst);
              }}>
              Calculate Intrinsic Value
            </Button>
          </Box>
          <Typography sx={{ my: 3.5 }} variant="h6" align="center">{(valuationNormal * 0.6) + (valuationWorst * 0.2) + (valuationBest * 0.2)}</Typography>
          <Typography sx={{ my: 3.5 }} variant="h6" align="center">{((valuationNormal * 0.6) + (valuationWorst * 0.2) + (valuationBest * 0.2))*0.7}</Typography>
        </Box>
      </div>

    } />
  )

}