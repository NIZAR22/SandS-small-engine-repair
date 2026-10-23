import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import ReviewsSection from '@/components/ReviewsSection.vue'
import reviews from '@/config/reviews'
import business from '@/config/business'

const localVue = createLocalVue()

describe('ReviewsSection.vue', () => {
  const mountComponent = () => mount(ReviewsSection, { localVue, vuetify: new Vuetify() })

  it('shows every configured review with its name and text', () => {
    const wrapper = mountComponent()
    const cards = wrapper.findAll('.review-card')

    expect(cards.length).toBe(reviews.length)
    reviews.forEach((review, i) => {
      expect(cards.at(i).text()).toContain(review.name)
      expect(cards.at(i).text()).toContain(review.text)
    })
  })

  it('announces the star rating as text, not just icons', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('[role="img"]').attributes('aria-label')).toBe('5 out of 5 stars')
  })

  it('links to all reviews on Google in a new tab', () => {
    const link = mountComponent().find(`a[href="${business.googleReviewsUrl}"]`)

    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toContain('noopener')
  })
})
