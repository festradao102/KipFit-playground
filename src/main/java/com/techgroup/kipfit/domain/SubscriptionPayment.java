package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SubscriptionPayment.
 */
@Entity
@Table(name = "subscription_payment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SubscriptionPayment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Integer amount;

    @OneToOne(mappedBy = "subscriptionPayment")
    @JsonIgnore
    private Subscriber subscriber;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public SubscriptionPayment amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Subscriber getSubscriber() {
        return subscriber;
    }

    public SubscriptionPayment subscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
        return this;
    }

    public void setSubscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubscriptionPayment)) {
            return false;
        }
        return id != null && id.equals(((SubscriptionPayment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubscriptionPayment{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
