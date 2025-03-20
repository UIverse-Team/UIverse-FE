async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    console.log(123)
    server.listen()
  } else {
    const { worker } = await import('./browser')
    console.log(worker)
    worker.start()
  }
}

export { initMSW }
