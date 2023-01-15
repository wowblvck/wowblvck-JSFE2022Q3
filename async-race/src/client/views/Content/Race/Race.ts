class Race {
  render = () => `
  <div class="col-lg-2">
    <div class="card h-100">
      <div class="card-body d-flex align-items-center">
        <div class="d-grid gap-2 col-6 col-lg-12 mx-auto">
          <button type="button" class="btn btn-sm btn-outline-primary">Start Race</button>
          <button type="button" class="btn btn-sm btn-outline-primary">Reset Race</button>
          <button type="button" class="btn btn-sm btn-outline-primary">Generate cars</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

export default Race;
