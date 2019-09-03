import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";

import Price from "./price";

const OrderForm = () => (
    <>
    <dd>
      <label>
        <input
          type="checkbox"
          name="auditVideo.inCart"
          checked={ this.state.products.auditVideo.inCart }
          onChange={ this.handleChange }
        />
        <span>
          { " " }
          Add screencast: {
            (
              this.state.products.auditVideo.inCart
              && this.state.products.auditVideo.waiveFee
            )
              ? <><del><ProductPrice product="auditVideo" /></del> $0</>
              : <ProductPrice product="auditVideo" />
          }
        </span>
      </label>
    </dd>
    <dd>
      <label className={ this.state.products.auditVideo.inCart ? "" : "disabled" }>
        <input
          type="checkbox"
          name="auditVideo.waiveFee"
          checked={
            this.state.products.auditVideo.inCart
            && this.state.products.auditVideo.waiveFee
          }
          onChange={ this.handleChange }
          disabled={ !this.state.products.auditVideo.inCart }
        />
        <span>
          { " " }
          Waive fee — I agree to let my video be made public.
        </span>
      </label>
    </dd>
    <dt className="inline"><label>Total:</label></dt>
    <dd className="inline"><output>{
      <Price value={
        (
          this.state.products.auditVideo.inCart
          && !this.state.products.auditVideo.waiveFee
        )
          ? ( this.state.products.audit.value.price + this.state.products.auditVideo.value.price )
          : this.state.products.audit.value.price
      } />
    }</output></dd>
    </>
);

export default OrderForm;
