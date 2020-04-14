
  useEffect(() => {
    if (!overviewState) return

    console.log(`
      calling 2nd useEffect;
      data must exist, setting input data, derived from:
      ${Object.keys(overviewState)} :: ${Object.values(overviewState)}
    `)

    setInput(R.compose(R.unnest, R.values)(overviewState))

    console.log('input', input)
    setInput(input)
  }, [overviewState])

  useEffect(() => {
    if (!input) return
    console.log('calling 3rd useEffect')

    // definitions
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
    const y = d3.scaleLinear().range([height, 0])
    const svg = d3.select(OVERVIEW_GRAPH).append('svg')

    // append to DOM
    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Configure domain!
    x.domain(input.map(d => d.program))
    y.domain([0, d3.max(input, d => d.impressions)])

    // Map values to pixels/proportions on screen:
    svg
      .selectAll('.bar')
      .data(input)
      .enter()
      .append('rect')
      .attr('className', 'bar')
      .attr('x', d => x(d.program))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.impressions))
      .attr('height', d => height - y(d.impressions))

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))

    svg.append('g').call(d3.axisLeft(y))

    // const scale = d3
    //   .scaleOrdinal(keys)
    //   .domain(keys)
    //   .range()
    // const axis = d3.axisBottom(scale).tickFormat(d => 'hai')

    const svgContainer = d3
      .select(`#${OVERVIEW_GRAPH}_CONTAINER`)
      .append('svg')
      .append('g')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    if (input) {
      svgContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -200)
        .attr('y', 80)
        .text(`Period: ${interval}`)

      // Good spot to link to docs:
      // svgContainer.append('text')
      // .attr('x', width/2 + 120)
      // .attr('y', height + 50)

      console.log('overviewState', overviewState)

      // const weeks = R.keys(data)

      // TODO: Update this value based on user location/browser settings
      const isoWeekStart = 'Sunday'

      svg
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'cadetblue')
        .style('stroke', 'green')

      const weekNumbers = R.keys(overviewState)
      const weekdates = R.map(getDateFromWeekNumber)(weekNumbers)
      const values = R.map(R.compose(R.pick(['program', 'impressions']), R.values))
      const bars = R.zip(weekdates, values)
      console.log('bars', bars)

      const weeksEnd = getDateFromWeekNumber()

        const xMax = momemt(d3.max(weeksEnd));

      
    }
  }, [input])
